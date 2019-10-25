import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Touchable } from 'react-native';
import ImageView from 'react-native-image-view';
import * as Animatable from 'react-native-animatable';
import Cong from './Cong';
import images from './images';

const helpImage = [
	{
		source: require('./assets/images/image_help.jpg'),
		width: Dimensions.get('screen').width,
		height: Dimensions.get('screen').width,
	},
];

const Box = (props) => {
	return (
		<TouchableOpacity
			style={[styles.box]}
			onPress={props.onPress}
			activeOpacity={0.7}
		>
			<Animatable.Image
				animation="bounceIn"
				easing="ease"
				duration={1200}
				delay={100}
				source={props.image}
				style={{
					height: 99,
					width: 99
				}}
			/>
		</TouchableOpacity>
	)
}

const Empty = <View style={{height: 99, width: 99, backgroundColor: 'transparent'}}/>;

class Home extends Component {
	actualImagesOrder = [
		[
			images.image00,
			images.image01,
			images.image02
		],
		[
            images.image10,
            images.image11,
            images.image12,
		],
		[
            images.image20,
            images.image21,
			null
		]
	];

	images = [
		[
			images.image00,
			images.image01,
			images.image02
		],
		[
            images.image10,
            images.image11,
            images.image12,
		],
		[
            images.image20,
            images.image21,
			null
		]
	];

	
	constructor(props) {
		super(props);
		this.state = {
			arr: this.images,
			nullIndexI: 2,
			nullIndexJ: 2,
			displayHelp: false,
			displayCong: false,
		};
	}

	componentDidMount = () => {
		
	}

	reset = () => {
		this.setState({
			arr: [
				[
                    images.image00,
                    images.image01,
                    images.image02
                ],
                [
                    images.image10,
                    images.image11,
                    images.image12,
                ],
                [
                    images.image20,
                    images.image21,
                    null
                ]
			],
			nullIndexI: 2,
			nullIndexJ: 2,
		})
	}

	validate = (rowIndex, colIndex) => {
		if (this.state.nullIndexJ === colIndex
			&& ((this.state.nullIndexI === rowIndex) 
			|| (this.state.nullIndexI === rowIndex + 1)
			|| (this.state.nullIndexI === rowIndex - 1))) {
			return true
		}
		
		if (rowIndex === this.state.nullIndexI && (
			(colIndex === this.state.nullIndexJ - 1
				|| colIndex === this.state.nullIndexJ + 1)
		)) {
			return true
		}

		return false;
	}

	onBoxClick = (i, j) => {
		if (!this.validate(i, j)) {
			return;
		}
		let { arr } = this.state;
		let temp = arr[i][j];
		arr[i][j] = null;
        arr[this.state.nullIndexI][this.state.nullIndexJ] = temp;
        this.setState({ 
			arr,
			nullIndexI: i, 
			nullIndexJ: j 
        });
	}
	
	render() { 
		return (
			<View style={styles.container}>
				
				<Text style={{fontSize: 36, color: "#ffffff"}}>SOLVE IT !!!</Text>
				<View style={styles.boxContainer}>
						{
							this.state.arr.map((row, rowIndex) => (
								<View key={rowIndex.toString()} style={styles.rowContainer}> 
								{
									row.map((col, colIndex) => (
										<Box key={`${rowIndex}${colIndex}`} image={col} onPress={() => this.onBoxClick(rowIndex, colIndex)} />
									))
								}
								</View>
							))
						}
				</View>
				<View style={styles.actionButtons}>
					<TouchableOpacity style={styles.button} onPress={() => this.reset()}>
						<Text style={styles.buttonText}>RESET</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.setState({ displayHelp: true })}>
						<Image	
							source={require('./assets/images/image_help.jpg')}
							style={{height: 100, width: 100}}
							resizeMode="center"
						/>
					</TouchableOpacity>
				</View>

                <TouchableOpacity style={styles.buttonDone} onPress={() => this.setState({ displayCong: true })}>
                    <Text style={styles.buttonText}>DONE ?</Text>
                </TouchableOpacity>
				
				<ImageView
					images={helpImage}
					imageIndex={0}
					isVisible={this.state.displayHelp}
					renderFooter={(currentImage) => null}
					onClose={() => this.setState({ displayHelp: false })}
				/>

				{
					this.state.displayCong && (
						<Cong />
					)
				}

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: "#aaddaa",
	},
	title: {
		fontSize: 34,
		color: "#ffffff",
		margin: 20
	},	
	boxContainer: {
		borderColor: "#ffffff",
		borderWidth: 1,
		width: 302
	},
	rowContainer: {
		flexDirection: 'row',
	},
	box: {
		backgroundColor: 'green',
		height: 100,
		width: 100,
		borderWidth: 1,
		borderColor: "#ffffff"
	},
	actionButtons: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		margin: 10
	},
	button: {
		padding: 10,
		backgroundColor: "#0000ff",
        margin: 10,
        height: 100,
        justifyContent: 'center',
        width: 100,
        alignItems: 'center',
	},
	buttonText: {
		fontSize: 24,
		color: "#ffffff"
    },
    buttonDone: {
        backgroundColor: "#2233aa",
        padding: 10,
        alignSelf: 'stretch',
        margin: 20,
        alignItems: 'center'
    }
});

export default Home;

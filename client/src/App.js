import './App.css';
import Header from './components/header'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import { Image as KonvaImage } from 'react-konva';
import Button from 'react-bootstrap/Button'
import { BsTrash } from 'react-icons/bs';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.stageRef = React.createRef();
        this.currKey = 0;
        this.isDrawing = false;
        this.state = {
            image: undefined,
            rectangles: [],
        }
    }

    createHTMLImageElement(test) {
        let image = new Image();
        image.src = test;
        return image;
    }
    handleFileUpload = (file) => { this.setState({ image: file }); }
    handleClear = (e) => {
        this.setState({ rectangles: [] });
        this.currKey = 0;
    }
    handleMouseDown = (e) => {
        this.isDrawing = true;
        let { x, y } = e.target.getStage().getPointerPosition();
        let rectangles = [...this.state.rectangles, {
            x,
            y,
            width: 0,
            height: 0,
            fill: "lightblue",
            stroke: "blue",
            id: this.currKey
        }];
        this.setState({ rectangles });
        this.currKey++;
    }
    handleMouseUp = (e) => { this.isDrawing = false; }
    handleMouseMove = (e) => {
        if (this.isDrawing) {
            let { x, y } = e.target.getStage().getPointerPosition();
            let currRect = this.state.rectangles[this.state.rectangles.length - 1];
            currRect.width = x - currRect.x;
            currRect.height = y - currRect.y;

            this.setState({ rectangles: this.state.rectangles });
        }
    }
    deleteBox(rectId) {
        let rectangles = this.state.rectangles;

        console.log(rectId + " ----");
        console.log(rectangles);
        if (rectangles && rectangles.length === 1) {
            rectangles = [];
            this.currKey = 0;
        } else {
            rectangles = rectangles.filter(rect => rect.id !== rectId);
        }
        console.log(rectangles);
        this.setState({ rectangles });
    }

    render() {
        let image = this.createHTMLImageElement(this.state.image);
        if (image && this.state.rectangles) {

            return (
                <div className="App">
                    <Header onFileUpload={this.handleFileUpload} handleClear={this.handleClear} />
                    <div className='main-content'>
                        <React.Fragment>
                            <Stage
                                className='stage'
                                ref={this.stageRef}
                                width={500}
                                height={500}
                                onMouseDown={this.handleMouseDown}
                                onMouseUp={this.handleMouseUp}
                                onMouseMove={this.handleMouseMove}
                            >
                                <Layer>
                                    <KonvaImage
                                        image={image}
                                        width={500}
                                        height={500}
                                    />
                                    {
                                        this.state.rectangles.map(rect => {
                                            return (
                                                <Group 
                                                    key={rect.id}
                                                    draggable
                                                >
                                                    <Rect
                                                        x={rect.x}
                                                        y={rect.y}
                                                        width={rect.width}
                                                        height={rect.height}
                                                        fill={rect.fill}
                                                        stroke={rect.stroke}
                                                    />
                                                    <Text
                                                        x={rect.x + (rect.width / 2)}
                                                        y={rect.y + (rect.height / 2)}
                                                        fontSize={20}
                                                        text={rect.id}
                                                    />
                                                </Group>
                                            )
                                        })
                                    }
                                </Layer>
                            </Stage>
                        </React.Fragment>
                        <div className='list'>
                            {this.state.rectangles.map(rect => {
                                return (
                                    <Button 
                                        className='delete-button'
                                        variant="danger"
                                        onClick={() => this.deleteBox(rect.id)}
                                        key={rect.id}
                                    >
                                        {rect.id}
                                        <BsTrash></BsTrash>
                                    </Button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            );
        }

    }
}

export default App;

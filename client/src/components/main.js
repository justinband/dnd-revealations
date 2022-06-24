import React from 'react';
import "./main.css";
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import { Image as KonvaImage } from 'react-konva';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.stageRef = React.createRef();
        this.currKey = 0;
        this.isDrawing = false;
        this.state = {
            rectangles: [],
        };
    }

    createHTMLImageElement(test) {
        let image = new Image();
        image.src = test;
        return image;
    }

    render() {
        // if(this.props.image) {
        // create a image element to be used in the Layer
        let image = this.createHTMLImageElement(this.props.image);
        return(
            <div>
                <React.Fragment>
                    <Stage
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
                                            key={rect.key}
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
                                                x={rect.x + (rect.width/2)}
                                                y={rect.y + (rect.height/2)}
                                                fontSize={20}
                                                text={rect.key}
                                            />
                                        </Group>
                                    )
                                })
                            }
                        </Layer>
                    </Stage>
                </React.Fragment>
            </div>
        );
    }
}

export default Main;
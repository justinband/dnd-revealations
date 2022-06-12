import React from 'react';
import "./main.css";
import { Stage, Layer } from 'react-konva';
import { Image as KonvaImage } from 'react-konva';


class Main extends React.Component {

    constructor(props) {
        super(props);
        this.stageRef = React.createRef();
    }

    createHTMLImageElement(test) {
        let image = new Image();
        image.src = test;
        return image;
    }

    render() {
        if(this.props.image) {
            // create a image element to be used in the Layer
            let newImage = this.createHTMLImageElement(this.props.image);
            return(
                <div>
                    <React.Fragment>
                        <Stage
                            ref={this.stageRef}
                            width={500}
                            height={500}
                        >
                            <Layer>
                                <KonvaImage
                                    image={newImage}
                                    width={500}
                                    height={500}
                                />
                            </Layer>
                        </Stage>
                    </React.Fragment>
                </div>
            );
        }
    }
}

export default Main;
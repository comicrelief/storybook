import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './styles.scss';

class FileUp extends Component {

    constructor() {
        super();
        this.state = {
            files: [],
            maxFiles: 5
        }
    }

    onDrop(files) {
        console.log(files.length);
        if (files.length > this.state.maxFiles) {
            this.setState({
                error: `You can only upload max 7 files`
            });
        } else {
            this.setState({
                files
            });
        }
    }

    handleImageReset(e) {
        e.preventDefault();

        let array = this.state.files;
        let index = array.indexOf(e.target.value);
        array.splice(index, 1);

        this.setState({
            files: array
        });
    }

    render() {

        return (
            <section>
                <div className="dropzone__wrapper">
                    <p className="font--centre">Upload designs as separate files.<br/>
                    Maximum {this.state.maxFiles} designs per school<br/>
                    File types accepted: JPG, PNG and PDF.</p>
                    {this.state.files.length > 0 ?
                        <div className="fuga__img-uploaded">
                            {this.state.files.map((file) =>
                            <span key={file.name} className="preview">
                                <img src={file.preview} alt=""/>
                                <p className="font--small font--centre"><a className="link" href="#" onClick={this.handleImageReset.bind(this)}>Remove</a></p>
                            </span>
                            )}
                        </div>
                        : null}
                    {this.state.files.length < this.state.maxFiles ?
                    <Dropzone
                        className="dropzone"
                        multiple={true}
                        accept="image/*"
                        onDrop={this.onDrop.bind(this)}
                    >
                        <p className="font--centre">Drop image here or <br/>click to upload <br/></p>
                        <p className="cross">&#43;</p>
                    </Dropzone>
                        : null}
                    {this.state.error ?
                        <p className="font--small font--centre error">{this.state.error}</p>
                        : null}
                </div>
            </section>
        );
    }
}

export default FileUp;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import './styles.scss';
import PdfImage from './Images/pdficon.png';
import newId from '../../utils/newid';

class FileUp extends Component {
  /**
   * FileUp constructor.
   */
  constructor() {
    super();
    this.state = {
      files: [],
      rejected: [],
      bigFile: false,
    };
    this.handleImageReset = this.handleImageReset.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  /**
   * On component mount.
   */
  componentWillMount() {
    this.dropZoneId = newId('dropzone-');
  }

  /**
   * On file drop.
   * @param files
   * @param rejected
   */
  onDrop(files, rejected) {
    const max = this.props.maxFiles;
    const filesCombined = [...this.state.files, ...files];
    console.log(rejected.length);
    if (files.length > max) {
      this.setState({
        error: `You can only upload max ${max} files`,
      });
    } else if (rejected.length > 0) {
      this.setState({
        error: 'Your file(s) are too big or wrong type. Please try again',
      });
    } else {
      let dupe = false;
      files.forEach((file1) => {
        this.state.files.forEach((file2) => {
          if (file1.name === file2.name) {
            dupe = true;
          }
        });
      });

      if (dupe) {
        this.setState({
          error: 'You cannot upload the same file twice. Please try again',
        });
      } else {
        this.setState({
          rejected,
          files: filesCombined,
          error: '',
        });
      }
    }
  }

  /**
   * Image reset handler.
   * @param e
   */
  handleImageReset(e) {
    e.preventDefault();

    const array = this.state.files;
    const index = array.indexOf(e.target.value);
    array.splice(index, 1);

    this.setState({
      files: array,
    });
  }

  /**
   * Component render.
   * @return {XML}
   */
  render() {
    return (
      <section>
        <div className="dropzone__wrapper">
          <p className="font--centre">Upload designs as separate files.<br />
            Max file size per file: {this.props.maxSize/1000000}MB<br />
            File types accepted: JPG, PNG and PDF.</p>
          {this.state.files.length > 0 ?
            <div className="file-up__img-uploaded">
              {this.state.files.map(file =>
                (<span key={file.name} className="preview">
                  {(file.type === 'application/pdf') ?
                    <img src={PdfImage} alt="" /> : <img src={file.preview} alt="" />}
                  <p className="font--small font--centre"><a
                    className="link"
                    href="#"
                    onClick={this.handleImageReset}
                  >Remove</a></p>
                </span>),
              )}
            </div>
            : null}
          {this.state.error ?
            <p className="font--centre error">{this.state.error}</p>
            : null}
          {this.state.files.length < this.props.maxFiles ?
            <label htmlFor={this.dropZoneId}><span className="visuallyhidden">click to upload</span>
              <Dropzone
                id={this.dropZoneId}
                className="dropzone"
                maxSize={this.props.maxSize}
                multiple
                accept={this.props.types}
                onDrop={this.onDrop}
              >
                <p>Drop image/s here <br />or click to upload <br /> <b className="font--small">Max. {this.props.maxFiles} designs per school</b></p>
                <p className="cross">+</p>
              </Dropzone>
            </label>
            : null}
        </div>
      </section>
    );
  }
}

FileUp.propTypes = {
  maxFiles: PropTypes.number.isRequired,
};

export { default as S3FileUploadService } from './src/service/S3FileUploadService';

export default FileUp;

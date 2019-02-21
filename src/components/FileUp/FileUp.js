import React, { Component } from 'react';
import propTypes from 'prop-types';
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
    if (filesCombined.length > max) {
      this.setState({
        error: `You can only upload max ${max} files.`,
      });
    } else if (rejected.length > 0) {
      if (rejected[0].size > this.props.maxSize) {
        this.setState({
          error: `File/s exceed maximum size. Maximum size for each file is ${this.props.maxSize / 1000000}MB`,
        });
      } else {
        this.setState({
          error: 'File type not accepted. Please upload JPG, PNG or PDF',
        });
      }
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
          error: 'You cannot upload the same file twice. Please try again.',
        });
      } else {
        this.setState({
          rejected,
          files: filesCombined,
          error: '',
        });
      }
    }
    this.props.onChange();
  }

  /**
   * Image delete handler.
   * @param e
   */

  removeFile(file, e) {
    e.preventDefault();
    const newState = this.state.files;
    if (newState.indexOf(file) > -1) {
      newState.splice(newState.indexOf(file), 1);
      this.setState({
        files: newState,
      });
    }
    this.props.onChange();
  }

  /**
   * Component render.
   * @return {XML}
   */
  render() {
    return (
      <section>
        <div className="dropzone__wrapper">
          <p className="font--centre">Upload designs as separate files<br />
            Max file size per file: {this.props.maxSize / 1000000}MB<br />
            File types accepted: JPG, PNG and PDF</p>
          {this.state.files.length > 0 ?
            <div className="file-up__img-uploaded">
              {this.state.files.map(file =>
                (<span key={file.name} className="preview">
                  {(file.type === 'application/pdf') ?
                    <img src={PdfImage} alt="" /> : <img src={file.preview} alt="" />}
                  <p className="font--small font--centre">
                    <button
                      className="link"
                      onClick={this.removeFile.bind(this, file)}
                    >
                    Remove
                    </button>
                  </p>
                </span>),
              )}
            </div>
            : null}
          {this.state.error ?
            <p className="font--centre error">{this.state.error}</p>
            : null}
          {this.state.files.length === this.props.maxFiles ?
            <p className="font--centre error">
              You&apos;ve reached your maximum amount of {this.props.maxFiles} files.
            </p>
            : null}
          {this.state.files.length < this.props.maxFiles ?
            <label htmlFor={this.dropZoneId}><span className="labelSpan">Image upload</span>
              <Dropzone
                id={this.dropZoneId}
                className="dropzone"
                maxSize={this.props.maxSize}
                multiple
                accept={this.props.types}
                onDrop={this.onDrop}
              >
                <p>
                  Drop image/s here <br />
                  or click to upload <br />
                  <b className="font--small">
                    Max. {this.props.maxFiles} designs per school
                  </b>
                </p>
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
  maxFiles: propTypes.number.isRequired,
  maxSize: propTypes.number.isRequired,
  onChange: propTypes.func.isRequired,
  types: propTypes.arrayOf(propTypes.string).isRequired,
};

export { default as S3FileUploadService } from './src/service/S3FileUploadService';

export default FileUp;

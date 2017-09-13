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

    if (files.length > max) {
      this.setState({
        error: `You can only upload max ${max} files`,
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
            Maximum {this.props.maxFiles} designs per school<br />
            File types accepted: JPG, PNG and PDF.</p>
          {this.state.files.length > 0 ?
            <div className="fuga__img-uploaded">
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
          {this.state.rejected.length > 0 ?
            <div>
              <p>Rejected file(s), wrong types</p>
              <ul>
                {
                  this.state.rejected.map(f => <li key={f.name}>{f.name}</li>)
                }
              </ul>
            </div>
            : null}
          {this.state.error ?
            <p className="font--small font--centre error">{this.state.error}</p>
            : null}
          {this.state.files.length < this.props.maxFiles ?
            <label htmlFor={this.dropZoneId}><span className="visuallyhidden">click to upload</span>
              <Dropzone
                id={this.dropZoneId}
                className="dropzone"
                multiple
                accept="image/*, application/pdf"
                onDrop={this.onDrop}
              >
                <p className="font--centre">Drop image here or <br />click to upload <br /></p>
                <p className="cross">&#43;</p>
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

export default FileUp;

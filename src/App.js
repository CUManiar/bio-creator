import React, { Component } from "react";
import "./App.css";
import * as jsPDF from 'jspdf'
// import BioDisplay from "./BioDisplay";

class App extends Component {
  constructor() {
    super();
    this.hourArr = new Array(24);
    this.minuteArr = Array.from({ length: 60 }, (v, k) => k + 1);
    this.image = null;
    this.state = {
      fname: null,
      dob: null,
      pob: null,
      img: null,
      height: null,
      weight: null,
      edu: null,
      profession: null,
      fatherName: null,
      motherName: null,
      maternalInfo: null,
      contactInfo: null,
      imgName: null
    };
  }

  generatePDF = () => {
    const pdf = new jsPDF({
      orientation: 'A4'
    });

    pdf.setFontSize(40);
    pdf.text(this.state.fname ? this.state.fname : 'Bio Data', 45, 25);

    // Candidate Image
    if (this.state.img) {
      pdf.addImage(this.state.img, 'JPEG', 110, 40, 80, 90)
    }

    pdf.setFontSize(16);
    Object.keys(this.state).forEach(item => {
      switch (item) {
        case 'fname':
          pdf.setFontStyle('bold')
          pdf.text('Full Name', 10, 50)
          pdf.setFontStyle('italic');
          pdf.text(this.state.fname ? this.state.fname : 'not available', 50, 50);
          break;
        case 'dob':
          pdf.setFontStyle('bold')
          pdf.text('Date of Birth', 10, 60)
          pdf.setFontStyle('italic');
          pdf.text(`${new Date(this.state.dob).getDate()}/${new Date(this.state.dob).toLocaleString('default', { month: 'long' })}/${new Date(this.state.dob).getFullYear()}`, 50, 60);
          break;
        case 'pob':
          pdf.setFontStyle('bold')
          pdf.text('Place of Birth', 10, 70)
          pdf.setFontStyle('italic');
          pdf.text(this.state.pob, 50, 70);
          break;
        case 'height':
          pdf.setFontStyle('bold')
          pdf.text('Height', 10, 80)
          pdf.setFontStyle('italic');
          pdf.text(this.state.height, 50, 80);
          break;
        case 'weight':
          pdf.setFontStyle('bold')
          pdf.text('Weight', 10, 90)
          pdf.setFontStyle('italic');
          pdf.text(this.state.weight, 50, 90);
          break;
        case 'edu':
          pdf.setFontStyle('bold')
          pdf.text('Education', 10, 100)
          pdf.setFontStyle('italic');
          pdf.text(this.state.edu, 50, 100);
          break;
        case 'fatherName':
          pdf.setFontStyle('bold')
          pdf.text('Father\'s Name', 10, 110)
          pdf.setFontStyle('italic');
          pdf.text(this.state.fatherName, 50, 110);
          break;
        case 'motherName':
          pdf.setFontStyle('bold')
          pdf.text('Mother\'s Name', 10, 120)
          pdf.setFontStyle('italic');
          pdf.text(this.state.motherName, 50, 120);
          break;
        case 'maternalInfo':
          pdf.setFontStyle('bold')
          pdf.text('Maternal Info', 10, 130)
          pdf.setFontStyle('italic');
          pdf.text(this.state.maternalInfo, 50, 130);
          break;
        case 'contactInfo':
          pdf.setFontStyle('bold')
          pdf.text('Contact Info', 10, 140)
          pdf.setFontStyle('italic');
          pdf.text(this.state.contactInfo, 50, 140);
          break;
        default:
      }
    });

    pdf.setFontSize(16)
    pdf.setTextColor(200, 0, 0)
    pdf.text('All rights reserved @2020 C U Maniyar', 10, 250)
    pdf.text('Mail to download without water mark', 10, 260)
    pdf.setTextColor(0, 0, 255)
    pdf.text('cumaniar18633@gmail.com', 103, 260);
    pdf.save(`${this.state.fname ? this.state.fname : 'BioData'}.pdf`);
  }

  fileHandle = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
      this.setState({ img: e.srcElement.result });
    }
    this.setState({
      imgName: e.target.files[0
      ].name
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (event) => {
    console.log(this.state);
    this.generatePDF();
    event.preventDefault();
  }


  render() {
    const submitStyle = {
      fontSize: '18px',
      fontWeight: 'bold'
    }

    return (
      <div>
        <h1 className="title">Bio Creator</h1>
        <div className="container text-center">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input className="input-text form-control w-50 i_50" type="text" name="fname" placeholder="First Name" onChange={this.handleChange.bind(this)} required />
              <small id="emailHelp" className="form-text text-muted">Enter first name --> middle name --> last name</small>
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input className="input-text form-control w-25 i_50" type="date" name="dob" onChange={this.handleChange.bind(this)} required />
            </div>
            <div className="form-group">
              <label htmlFor="pob">Place of Birth</label>
              <input className="input-text form-control w-25 i_50" type="text" placeholder="Place of Birth" name="pob" onChange={this.handleChange.bind(this)} required />
            </div>
            <div className="form-group">
              <label htmlFor="height">Height</label>
              <input className="input-text form-control w-25 i_50" type="number" placeholder="Height in Centimeter (Cms)" name="height" onChange={this.handleChange.bind(this)} required />
            </div>
            <div className="form-group">
              <label htmlFor="wight">Weight</label>
              <input className="input-text form-control w-25 i_50" type="number" placeholder="Weight in Kilograms (Kgs)" name="weight" onChange={this.handleChange.bind(this)} required />
            </div>
            <div className="form-group">
              <label htmlFor="education">Education</label>
              <input className="input-text form-control w-50 i_50" type="text" placeholder="Bachelor of Engineering (B.E.)" name="edu" onChange={this.handleChange.bind(this)} required />
            </div>
            <div className="form-group">
              <label htmlFor="fathersName">Father's Name</label>
              <input className="input-text form-control w-50 i_50" type="text" placeholder="Father's Name" name="fatherName" onChange={this.handleChange.bind(this)} required />
            </div>
            <div className="form-group">
              <label htmlFor="mothersName">Mother's Name</label>
              <input className="input-text form-control w-50 i_50" type="text" placeholder="Mother's Name" name="motherName" onChange={this.handleChange.bind(this)} required />
            </div>
            <div className="form-group">
              <label htmlFor="maternalHome">Maternal Name </label>
              <textarea className="input-text form-control w-50 i_50" rows="5" cols="50" placeholder="Maternal Home" name="maternalInfo" onChange={this.handleChange.bind(this)} required></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="contactInfo">Contact Info</label>
              <textarea className="input-text form-control w-50 i_50" rows="5" cols="50" placeholder="Contact Info" name="contactInfo" onChange={this.handleChange.bind(this)} required></textarea>
            </div>
            <div className="form-group w-50 i_50">
              <label htmlFor="image">Your Photo </label>
              <div className="custom-file">
                <input type="file" className="custom-file-input w-25" id="customFile" name="file" onChange={this.fileHandle.bind(this)} required />
                <label className="custom-file-label" htmlFor="customFile">{this.state.imgName ? this.state.imgName : 'Choose file'}</label>
              </div>
            </div>
            <button type="submit" style={submitStyle} className="btn btn-success">Generate Bio</button>
          </form>
          <hr />
        </div>
      </div>
    );
  }
}

export default App;

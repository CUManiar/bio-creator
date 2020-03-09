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
      status: 'Unmarried',
      fatherName: null,
      fatherProf: null,
      motherName: null,
      motherProf: null,
      maternalInfo: null,
      contactInfo: null,
      imgName: null
    };
  }

  generatePDF = () => {

    console.log(this.state);

    const pdf = new jsPDF({
      orientation: 'A4'
    });

    pdf.setFont('Segoe UI');
    pdf.rect(5, 5, 190, 290);
    pdf.setFontSize(36);
    const title = pdf.splitTextToSize(this.state.fname ? this.state.fname : 'Bio Data', 180)
    pdf.text(25, 20, title);

    // Candidate Image
    if (this.state.img) {
      pdf.addImage(this.state.img, 'JPEG', 110, 50, 80, 90)
    }

    pdf.setFontSize(16);
    Object.keys(this.state).forEach(item => {
      switch (item) {
        case 'fname':
          pdf.setFontStyle('bold')
          pdf.text('Full Name', 10, 45)
          pdf.setFontStyle('italic');
          const name = pdf.splitTextToSize(this.state.fname ? this.state.fname : 'N/A', 70);
          pdf.text(50, 45, name);
          break;
        case 'dob':
          pdf.setFontStyle('bold')
          pdf.text('Date of Birth', 10, 60)
          pdf.setFontStyle('italic');
          pdf.text(`${new Date(this.state.dob).getDate()} ${new Date(this.state.dob).toLocaleString('default', { month: 'long' })} ${new Date(this.state.dob).getFullYear()}`, 50, 60);
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
          const feet = ((parseFloat(this.state.height)) / 30.48).toFixed(1).split('.')[0];
          const inches = ((parseFloat(this.state.height)) / 30.48).toFixed(1).split('.')[1];
          pdf.text(`${feet} ft ${inches} in  (${feet}' ${inches}")`, 50, 80);
          break;
        case 'weight':
          pdf.setFontStyle('bold')
          pdf.text('Weight', 10, 90)
          pdf.setFontStyle('italic');
          pdf.text(`${this.state.weight} Kgs`, 50, 90);
          break;
        case 'edu':
          pdf.setFontStyle('bold')
          pdf.text('Education', 10, 100)
          pdf.setFontStyle('italic');
          const education = pdf.splitTextToSize(this.state.edu, 70);
          pdf.text(50, 100, education);
          break;
        case 'profession':
          pdf.setFontStyle('bold')
          pdf.text('Profession', 10, 120)
          pdf.setFontStyle('italic');
          const prof = pdf.splitTextToSize(this.state.profession, 65);
          pdf.text(50, 120, prof);
          break;
        case 'status':
          pdf.setFontStyle('bold')
          pdf.text('Marital Status', 10, 140)
          pdf.setFontStyle('italic');
          pdf.text(this.state.status, 50, 140);
          break;
        case 'fatherName':
          pdf.setFontStyle('bold')
          pdf.text('Father\'s Name', 10, 150)
          pdf.setFontStyle('italic');
          pdf.text(this.state.fatherName, 50, 150);
          break;
        case 'fatherProf':
          pdf.setFontStyle('bold')
          pdf.text('Father\'s Prof', 10, 160)
          pdf.setFontStyle('italic');
          pdf.text(this.state.fatherProf, 50, 160);
          break;
        case 'motherName':
          pdf.setFontStyle('bold')
          pdf.text('Mother\'s Name', 10, 170)
          pdf.setFontStyle('italic');
          pdf.text(this.state.motherName, 50, 170);
          break;
        case 'motherProf':
          pdf.setFontStyle('bold')
          pdf.text('Mother\'s Prof', 10, 180)
          pdf.setFontStyle('italic');
          pdf.text(this.state.motherProf, 50, 180);
          break;
        case 'maternalInfo':
          pdf.setFontStyle('bold')
          pdf.text('Maternal Info', 10, 190)
          pdf.setFontStyle('italic');
          pdf.text(this.state.maternalInfo, 50, 190);
          break;
        case 'contactInfo':
          pdf.setFontStyle('bold')
          pdf.text('Contact Info', 10, 210)
          pdf.setFontStyle('italic');
          pdf.text(this.state.contactInfo, 50, 210);
          break;
        default:
      }
    });

    pdf.setFontSize(16)
    pdf.setTextColor(200, 0, 0)
    pdf.text('All rights reserved @2020 C U Maniyar', 10, 260)
    pdf.text('Mail us for bio-data without watermark: ', 10, 270)
    pdf.setTextColor(0, 0, 255)
    pdf.text('cumaniar18633@gmail.com', 10, 280);
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
              <input className="input-text form-control wd-50 i_50" type="text" name="fname" placeholder="First Name" onChange={this.handleChange.bind(this)} required />
              <small id="emailHelp" className="form-text text-muted">Enter first name --> middle name --> last name</small>
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input className="input-text form-control wd-25 i_50" type="date" name="dob" onChange={this.handleChange.bind(this)} required />
            </div>
            <div className="form-group">
              <label htmlFor="pob">Place of Birth</label>
              <input className="input-text form-control wd-25 i_50" type="text" placeholder="Place of Birth" name="pob" onChange={this.handleChange.bind(this)} required />
            </div>
            <div className="form-group">
              <label htmlFor="height">Height</label>
              <input className="input-text form-control wd-25 i_50" type="number" placeholder="Height in Centimeter (Cms)" name="height" onChange={this.handleChange.bind(this)} required />
            </div>
            <div className="form-group">
              <label htmlFor="wight">Weight</label>
              <input className="input-text form-control wd-25 i_50" type="number" placeholder="Weight in Kilograms (Kgs)" name="weight" onChange={this.handleChange.bind(this)} required />
            </div>
            <div className="form-group">
              <label htmlFor="education">Education</label>
              <input className="input-text form-control wd-50 i_50" type="text" placeholder="Bachelor of Engineering (B.E.)" name="edu" onChange={this.handleChange.bind(this)} required />
            </div>
            <div className="form-group">
              <label htmlFor="profession">Profession</label>
              <input className="input-text form-control wd-50 i_50" type="text" placeholder="i.e. Software Engineer" name="profession" onChange={this.handleChange.bind(this)} required />
            </div>
            <div className="form-group">
              <label htmlFor="status" className="status">Marital Status</label>
              <select className="form-control custom-select input_text wd-50" onChange={this.handleChange.bind(this)} required name="status">
                <option value="Unmarried">Unmarried</option>
                <option value="Divorced">Divorced</option>
                <option value="Widow">Widow</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="fathersName">Father's Name</label>
              <input className="input-text form-control wd-50 i_50" type="text" placeholder="Father's Name" name="fatherName" onChange={this.handleChange.bind(this)} required />
            </div>
            <div className="form-group">
              <label htmlFor="fatherProf">Father's Profession</label>
              <input className="input-text form-control wd-50 i_50" type="text" placeholder="Father's Profession" name="fatherProf" onChange={this.handleChange.bind(this)} required />
            </div>
            <div className="form-group">
              <label htmlFor="mothersName">Mother's Name</label>
              <input className="input-text form-control wd-50 i_50" type="text" placeholder="Mother's Name" name="motherName" onChange={this.handleChange.bind(this)} required />
            </div>
            <div className="form-group">
              <label htmlFor="motherProf">Mother's Profession</label>
              <input className="input-text form-control wd-50 i_50" type="text" placeholder="Mother's Profession" name="motherProf" onChange={this.handleChange.bind(this)} required />
            </div>
            <div className="form-group">
              <label htmlFor="maternalHome">Maternal Info </label>
              <textarea className="input-text form-control wd-50 i_50" rows="5" cols="50" placeholder="Maternal Home" name="maternalInfo" onChange={this.handleChange.bind(this)} required></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="contactInfo">Contact Info</label>
              <textarea className="input-text form-control wd-50 i_50" rows="5" cols="50" placeholder="Contact Info" name="contactInfo" onChange={this.handleChange.bind(this)} required></textarea>
            </div>
            <div className="form-group wd-50 i_50">
              <label htmlFor="image">Your Photo </label>
              <div className="custom-file">
                <input type="file" className="custom-file-input wd-25" id="customFile" name="file" onChange={this.fileHandle.bind(this)} required />
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

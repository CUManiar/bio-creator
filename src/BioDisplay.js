import React from 'react';

const BioDisplay = ({ userInfo }) => {
    return (
        <div className="bio-data justify-content-center">
            {userInfo.map((item, i) => {
                return (
                    <div key={item.fname + '_' + Math.floor(Math.random() * 110)}>
                        <div className="row">
                            {(item.img && item.img.length > 0) ? <img src={item.img} alt={item.fname + '-' + item.lname} className="col d-flex justify-content-start" id={item.fname + Math.floor(Math.random() * 199)}></img> : null}
                        </div>
                        <div className="row">
                            <div className="col-3" id={item.fname}> Full Name : </div>
                            <div className="col d-flex justify-content-start"> {item.fname}  {item.mname} {item.lname}</div>
                        </div>
                        <div className="row">
                            <div className="col-3" id={item.dob}> Date of Birth : </div>
                            <div className="col d-flex justify-content-start" id={item.dob}> {item.dob}</div>
                        </div>
                        <div className="row">
                            <div className="col-3" id={item.pob}> Place of Birth : </div>
                            <div className="col d-flex justify-content-start" id={item.pob}> {item.pob}</div>
                        </div>
                    </div>
                )
            })
            }
        </div>
    )
}

export default BioDisplay;
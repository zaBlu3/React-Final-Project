import React, { createContext, useContext, useState } from 'react';
import FormTemplate from './FormTemplate';


const InitialData = {
    subscriptions : {},
    movies:{},
    users: {permissions : {}}
}
const FormFields = {
    subscriptions : [
    {
        name: "name",
        type: "text",
        placeholder: "Full Name",
        text: "make sure you enter 2 words only as fullname",
    },
    {
        name: "email",
        type: "email",
        placeholder: "Email",
        text: "email must include with @ and .",
    },
    {
        name: "city",
        type: "text",
        placeholder: "City",
    
    },],
    movies : [
            
            
        {name : "name", type : "text", placeholder : "Name", text : "min length 2"},
        {name : "premiered", type : "date", text : "between 1888-2025",css:"text-center"},
        {name : "image", type : "text", placeholder : "Name", text : "make sure to inlude protocl"},
        {name : "genres", type : "text", placeholder : "Name", text : "	please use `,` between genres"},
    
    
    
    
    ],
    users : [
        {name : "firstname", type : "text", placeholder : "First Name", text : "min length 2"},
        {name : "lastname", type : "text", placeholder : "Last Name", text : "min length 2"},
        {name : "username", type : "text", placeholder : "Username", text : "min length 2"},
        {name : "ViewMovies", type : "checkbox"},
        {name : "UpdateMovies", type : "checkbox"},
        {name : "DeleteMovies", type : "checkbox"},
        {name : "CreateMovies", type : "checkbox"},
        {name : "ViewSubscriptions", type : "checkbox"},
        {name : "UpdateSubscriptions", type : "checkbox"},
        {name : "DeleteSubscriptions", type : "checkbox"},
        {name : "CreateSubscriptions", type : "checkbox"},

    ]
}


export const FormContext = createContext();


 

function FormsTypes({title,dispatch,page,}) {//contxt or drill
      return (
        <FormTemplate
                            key={title}
							title={title}
							dispatch={dispatch}
							
							formData={FormFields[page]}page={page}
							initalData={InitialData[page]}
						/>
    );
}

export default FormsTypes;
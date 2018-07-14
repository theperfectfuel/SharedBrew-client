import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import FormTextField from './FormTextField';
import FormTextArea from './FormTextArea';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';

const renderedArrayStyle = {
    margin: '50px 0',
    padding: '5px 0',
    backgroundColor: '#fbfbfb'
}

const formStyle = {
    minWidth: '320px',
    maxWidth: '700px',
    margin: '50px auto'
}

const inputStyle = {
    width: '70%',
    float: 'right',
    border: '0',
    borderBottom: '1px solid lightgray',
    padding: '12px',
    margin: '10px',
    fontSize: '18px',
    resize: 'both'
}

const labelStyle = {
    width: '20%',
    float: 'left',
    textAlign: 'right',
    marginTop: '20px'
}

const clearStyle = {
    content: '',
    display: 'table',
    clear: 'both'
}

const FIELDS = [
    { label: 'Beer Name', name: 'beer_name'},
    { label: 'Beer Style', name: 'beer_style'},
    { label: 'Beer ABV', name: 'beer_abv'},
    { label: 'Original Gravity', name: 'orig_grav'},
    { label: 'Final Gravity', name: 'final_grav'}
];

// const SELECT_FIELDS = [
//     {   label: 'Brew Difficulty', 
//         name: 'brew_difficulty',
//         options: ['Easy', 'Medium', 'Hard']
//     },
//     {   label: 'Batch Size', 
//         name: 'batch_size',
//         options: [1, 3, 5]
//     }
// ];

// const renderedSelectFields = FIELDS.map(field => {
//     return (
//         <div key={field.name}>
//             <Field 
//                 label={field.label} 
//                 type='select' 
//                 name={field.name} 
//                 component={FormSelect} 
//                 options={field.options}
//             />
//         </div>
//     )
// });

const renderedFields = FIELDS.map(field => {
    return (
        <div key={field.name}>
            <Field 
                label={field.label} 
                type='text' 
                name={field.name} 
                component={FormTextField} 
            />
        </div>
    )
});

const renderedInstructions = () => {
    return(
        <div>
            <Field 
                label="Brew Instructions" 
                type='textarea' 
                name='brew_instructions' 
                component={FormTextArea} 
            />
        </div>
    )
};

const renderedDifficulty = () => {
    return(
        <div>
            <label style={labelStyle}>Brew Difficulty</label>
            <div>
            <Field style={inputStyle} name="brew_difficulty" component="select">
                <option></option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </Field>
            </div>
            <span style={clearStyle}></span>
        </div>
    )
};

const renderedBatchSize = () => {
    return(
        <div>
            <label style={labelStyle}>Batch Size</label>
            <div>
            <Field style={inputStyle} name="batch_size" component="select">
                <option></option>
                <option value="1">1 gal</option>
                <option value="3">3 gals</option>
                <option value="5">5 gals</option>
            </Field>
            </div>
            <span style={clearStyle}></span>
        </div>
    )
};

export class NewRecipe extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    renderGrains = ({ fields, meta: { error, submitFailed } }) => (
        <ul style={renderedArrayStyle}>
            {fields.map((grain, index) =>
                <li key={index}>
                    <h4>Grain #{index + 1}</h4>
                    <button type="button" onClick={() => fields.remove(index)}>
                        Remove these grains 
                    </button>
                    <Field 
                        name={`${grain}.grains_type`}
                        type="text"
                        component={FormTextField}
                        label="Grain Type"
                    />
                    <Field 
                        name={`${grain}.grains_amount`}
                        type="text"
                        component={FormTextField}
                        label="Grain Amount"
                    />
                </li>
            )}
            <li>
                <button type="button" onClick={() => fields.push({})}>
                    Add Grains
                </button>
                <div>{submitFailed && error && <span>{error}</span>}</div>
            </li>
        </ul>
    );

    renderHops = ({ fields, meta: { error, submitFailed } }) => (
        <ul style={renderedArrayStyle}>
            {fields.map((hop, index) => (
                <li key={index}>
                    <button type="button" onClick={() => fields.remove(index)}>
                        Remove hops 
                    </button>
                    <h4>Hops #{index + 1}</h4>
                    <Field 
                        name={`${hop}.hops_type`}
                        type="text"
                        component={FormTextField}
                        label="Hops Type"
                    />
                    <Field 
                        name={`${hop}.hops_amount`}
                        type="text"
                        component={FormTextField}
                        label="Hops Amount"
                    />
                </li>
            ))}
            <li>
                <button type="button" onClick={() => fields.push({})}>
                    Add Hops
                </button>
                {submitFailed && error && <span>{error}</span>}
            </li>
        </ul>
    );

    renderYeast = ({ fields, meta: { error, submitFailed } }) => (
        <ul style={renderedArrayStyle}>
            {fields.map((yeast, index) => (
                <li key={index}>
                    <button type="button" onClick={() => fields.remove(index)}>
                        Remove yeast 
                    </button>
                    <h4>Yeast #{index + 1}</h4>
                    <Field 
                        name={`${yeast}.yeast_type`}
                        type="text"
                        component={FormTextField}
                        label="Yeast Type"
                    />
                    <Field 
                        name={`${yeast}.yeast_amount`}
                        type="text"
                        component={FormTextField}
                        label="Yeast Amount"
                    />
                </li>
            ))}
            <li>
                <button type="button" onClick={() => fields.push({})}>
                    Add Yeast
                </button>
                {submitFailed && error && <span>{error}</span>}
            </li>
        </ul>
    );

    renderOther = ({ fields, meta: { error, submitFailed } }) => (
        <ul style={renderedArrayStyle}>
            {fields.map((other, index) => (
                <li key={index}>
                    <button type="button" onClick={() => fields.remove(index)}>
                        Remove ingredient 
                    </button>
                    <h4>Ingredient #{index + 1}</h4>
                    <Field 
                        name={`${other}.other_ingredient`}
                        type="text"
                        component={FormTextField}
                        label="Ingredient Type"
                    />
                    <Field 
                        name={`${other}.other_amount`}
                        type="text"
                        component={FormTextField}
                        label="Ingredient Amount"
                    />
                </li>
            ))}
            <li>
                <button type="button" onClick={() => fields.push({})}>
                    Add Other Ingredient
                </button>
                {submitFailed && error && <span>{error}</span>}
            </li>
        </ul>
    );

    doSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        console.log(this.props.formValues);

        axios('http://localhost:8080/new-recipe', {
            method: 'post',
            data: this.props.formValues,
            withCredentials: true
        })
            .then(response => {
                console.log(response);
                window.location = '/list-recipes';
            })
            .catch(error => {
                console.log(error);
            })
    };

    render() {

        const { 
            pristine, 
            reset, 
            submitting
        } = this.props;

        return(
            <div style={Object.assign(formStyle)}>
            <h2>Create a new recipe</h2>
                <form onSubmit={(e) => this.doSubmit(e)}>
                    {renderedFields}
                    {renderedDifficulty()}
                    {renderedBatchSize()}
                    <FieldArray name="grains_list" component={this.renderGrains} />
                    <FieldArray name="hops_list" component={this.renderHops} />
                    <FieldArray name="yeast_list" component={this.renderYeast} />
                    <FieldArray name="other_list" component={this.renderOther} />
                    {renderedInstructions()}
                    <div>
                        <button 
                            type="submit"
                            disabled={submitting}>
                            Submit 
                        </button>
                        <button type="button" disabled={pristine || submitting} onClick={reset}>
                            Clear values
                        </button>
                    </div>
                </form>
    
            </div>
        );

    }
}

function validate(values) {
    const errors = {};

    if (!values.beer_name) {
        errors.beer_name = 'Please provide a name for this recipe'
    }
    if (!values.beer_style) {
        errors.beer_style = 'Please provide a style for this recipe'
    }
    if (!values.beer_abv) {
        errors.beer_abv = 'Please provide a numeric ABV for this recipe'
    }
    if (!values.orig_grav) {
        errors.orig_grav = 'Please provide a numeric original gravity for this recipe'
    }
    if (!values.final_grav) {
        errors.final_grav = 'Please provide a numeric final gravity for this recipe'
    }
    if (!values.brew_difficulty) {
        errors.brew_difficulty = 'Please provide a brew difficulty for this recipe'
    }
    if (!values.batch_size) {
        errors.batch_size = 'Please provide a numeric batch size for this recipe'
    }

    return errors;
}

function mapStateToProps(state) {
    return { formValues: state.form.NewRecipe.values };
};

NewRecipe = connect(mapStateToProps, actions)(NewRecipe);

export default reduxForm({
    validate,
    form: "NewRecipe"
})(NewRecipe);

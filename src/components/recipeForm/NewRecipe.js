import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import FormTextField from './FormTextField';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';

const FIELDS = [
    { label: 'Beer Name', name: 'beer_name'},
    { label: 'Beer Style', name: 'beer_style'},
    { label: 'Beer ABV', name: 'beer_abv'},
    { label: 'Original Gravity', name: 'orig_grav'},
    { label: 'Final Gravity', name: 'final_grav'},
    { label: 'Brew Difficulty', name: 'brew_difficulty'},
    { label: 'Batch Size', name: 'batch_size'}
];

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

export class NewRecipe extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    renderGrains = ({ fields, meta: { error, submitFailed } }) => (
        <ul>
            <li>
                <button type="button" onClick={() => fields.push({})}>
                    Add Grains
                </button>
                {submitFailed && error && <span>{error}</span>}
            </li>
            {fields.map((grain, index) =>
                <li key={index}>
                    <button type="button" onClick={() => fields.remove(index)}>
                        Remove grains 
                    </button>
                    <h4>Grain #{index + 1}</h4>
                    <Field 
                        name={`${grain}.grains_type`}
                        type="text"
                        component="input"
                        label="Grain Type"
                    />
                    <Field 
                        name={`${grain}.grains_amount`}
                        type="text"
                        component="input"
                        label="Grain Amount"
                    />
                </li>
            )}
        </ul>
    );

    renderHops = ({ fields, meta: { error, submitFailed } }) => (
        <ul>
            <li>
                <button type="button" onClick={() => fields.push({})}>
                    Add Hops
                </button>
                {submitFailed && error && <span>{error}</span>}
            </li>
            {fields.map((hop, index) => (
                <li key={index}>
                    <button type="button" onClick={() => fields.remove(index)}>
                        Remove hops 
                    </button>
                    <h4>Hops #{index + 1}</h4>
                    <Field 
                        name={`${hop}.hops_type`}
                        type="text"
                        component="input"
                        label="Hops Type"
                    />
                    <Field 
                        name={`${hop}.hops_amount`}
                        type="text"
                        component="input"
                        label="Hops Amount"
                    />
                </li>
            ))}
        </ul>
    );

    renderYeast = ({ fields, meta: { error, submitFailed } }) => (
        <ul>
            <li>
                <button type="button" onClick={() => fields.push({})}>
                    Add Yeast
                </button>
                {submitFailed && error && <span>{error}</span>}
            </li>
            {fields.map((yeast, index) => (
                <li key={index}>
                    <button type="button" onClick={() => fields.remove(index)}>
                        Remove yeast 
                    </button>
                    <h4>Yeast #{index + 1}</h4>
                    <Field 
                        name={`${yeast}.yeast_type`}
                        type="text"
                        component="input"
                        label="Yeast Type"
                    />
                    <Field 
                        name={`${yeast}.yeast_amount`}
                        type="text"
                        component="input"
                        label="Yeast Amount"
                    />
                </li>
            ))}
        </ul>
    );

    renderOther = ({ fields, meta: { error, submitFailed } }) => (
        <ul>
            <li>
                <button type="button" onClick={() => fields.push({})}>
                    Add Other Ingredient
                </button>
                {submitFailed && error && <span>{error}</span>}
            </li>
            {fields.map((other, index) => (
                <li key={index}>
                    <button type="button" onClick={() => fields.remove(index)}>
                        Remove ingredient 
                    </button>
                    <h4>Ingredient #{index + 1}</h4>
                    <Field 
                        name={`${other}.type`}
                        type="text"
                        component="input"
                        label="Ingredient Type"
                    />
                    <Field 
                        name={`${other}.amount`}
                        type="text"
                        component="input"
                        label="Ingredient Amount"
                    />
                </li>
            ))}
        </ul>
    );

    renderInstructions() {
        return(
            <div>
                <Field 
                    label="Brew Instructions" 
                    type='textarea' 
                    name='brew_instructions' 
                    component='input' 
                />
            </div>
        )
    };

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
            <div>
                <form onSubmit={(e) => this.doSubmit(e)}>
                    {renderedFields}
                    <FieldArray name="grains_list" component={this.renderGrains} />
                    <FieldArray name="hops_list" component={this.renderHops} />
                    <FieldArray name="yeast_list" component={this.renderYeast} />
                    <FieldArray name="other_list" component={this.renderOther} />
                    {this.renderInstructions()}
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

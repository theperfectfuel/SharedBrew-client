import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import FormTextField from './FormTextField';

export class NewRecipe extends Component {

    renderGrains = ({ fields, meta: { error, submitFailed } }) => (
        <ul>
            <li>
                <button type="button" onClick={() => fields.push({})}>
                    Add Grains
                </button>
                {submitFailed && error && <span>{error}</span>}
            </li>
            {fields.map((grain, index) => (
                <li key={index}>
                    <button type="button" onClick={() => fields.remove(index)}>
                        Remove grains 
                    </button>
                    <h4>Grain #{index + 1}</h4>
                    <Field 
                        name={`${grain}.type`}
                        type="text"
                        component="input"
                        label="Grain Type"
                    />
                    <Field 
                        name={`${grain}.amount`}
                        type="text"
                        component="input"
                        label="Grain Amount"
                    />
                </li>
            ))}
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
                        name={`${hop}.type`}
                        type="text"
                        component="input"
                        label="Hops Type"
                    />
                    <Field 
                        name={`${hop}.amount`}
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
                        name={`${yeast}.type`}
                        type="text"
                        component="input"
                        label="Yeast Type"
                    />
                    <Field 
                        name={`${yeast}.amount`}
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

    renderFields() {
        return(
            <div>
                <Field 
                    label="Beer Name" 
                    type='text' 
                    name='beer_name' 
                    component={FormTextField} 
                />
                <Field 
                    label="Beer Style" 
                    type='text' 
                    name='beer_style' 
                    component={FormTextField} 
                />
                <Field 
                    label="Beer ABV" 
                    type='text' 
                    name='beer_abv' 
                    component={FormTextField} 
                />
                <Field 
                    label="Original Gravity" 
                    type='text' 
                    name='orig_grav' 
                    component={FormTextField} 
                />
                <Field 
                    label="Final Gravity" 
                    type='text' 
                    name='final_grav' 
                    component={FormTextField} 
                />
                <Field 
                    label="Brew Difficulty" 
                    type='text' 
                    name='brew_difficulty' 
                    component={FormTextField} 
                />
                <Field 
                    label="Batch Size" 
                    type='text' 
                    name='batch_size' 
                    component={FormTextField} 
                />
            </div>
        )
    };

    constructor(props) {
        super(props);
    }

    render() {

        const { handleSubmit, pristine, reset, submitting } = this.props;

        return(
            <div>
                <form onSubmit={handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <FieldArray name="grains_list" component={this.renderGrains} />
                    <FieldArray name="hops_list" component={this.renderHops} />
                    <FieldArray name="yeast_list" component={this.renderYeast} />
                    <FieldArray name="other_list" component={this.renderOther} />
                    {this.renderInstructions()}
                    <div>
                        <button type="submit" disabled={submitting}>
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

export default reduxForm({
    form: "NewRecipe"
})(NewRecipe);
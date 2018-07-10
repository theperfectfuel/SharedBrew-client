import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import axios from 'axios';

const loginBtnStyle = {
    fontSize: '1em',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    marginLeft: '5px'
};

const sectionStyle = {
    paddingTop: '10px',
    borderTop: '1px solid #ccc'
}

const bottomStyle = {
    paddingBottom: '10px',
    borderBottom: '1px solid #ccc'
}

const formHeader = {
    padding: '30px'
}

const formContainer = {
    maxWidth: '700px',
    margin: '0 auto'
}

class NewRecipe extends Component {

    constructor() {
        super();

        this.state = {
            beer_name: '',
            beer_style: '',
            beer_abv: '',
            orig_grav: '',
            final_grav: '',
            brew_difficulty: '',
            batch_size: '',
            brew_instructions: '',
            grains_list: [],
            hops_list: [],
            yeast_list: [],
            other_list: [],
            grain_amount: '',
            grain_type: '',
            hops_amount: '',
            hops_type: '',
            yeast_amount: '',
            yeast_type: '',
            other_amount: '',
            other_type: ''
        };

        this.onGrainTypeChange = this.onGrainTypeChange.bind(this);
        this.onGrainAmountChange = this.onGrainAmountChange.bind(this);

        this.onHopsTypeChange = this.onHopsTypeChange.bind(this);
        this.onHopsAmountChange = this.onHopsAmountChange.bind(this);

        this.onYeastTypeChange = this.onYeastTypeChange.bind(this);
        this.onYeastAmountChange = this.onYeastAmountChange.bind(this);

        this.onOtherTypeChange = this.onOtherTypeChange.bind(this);
        this.onOtherAmountChange = this.onOtherAmountChange.bind(this);

        this.onBeerNameChange = this.onBeerNameChange.bind(this);
        this.onBeerStyleChange = this.onBeerStyleChange.bind(this);
        this.onBeerAbvChange = this.onBeerAbvChange.bind(this);
        this.onBrewInstructionsChange = this.onBrewInstructionsChange.bind(this);
        this.onBatchSizeChange = this.onBatchSizeChange.bind(this);
        this.onBrewDifficultyChange = this.onBrewDifficultyChange.bind(this);
        this.onFinalGravChange = this.onFinalGravChange.bind(this);
        this.onOrigGravChange = this.onOrigGravChange.bind(this);

        this.onAddGrains = this.onAddGrains.bind(this);
        this.onAddHops = this.onAddHops.bind(this);
        this.onAddYeast = this.onAddYeast.bind(this);
        this.onAddOther = this.onAddOther.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkState = this.checkState.bind(this);
    }

    onBeerNameChange(e) {
        this.setState({beer_name: e.target.value});
    }

    onBeerStyleChange(e) {
        this.setState({beer_style: e.target.value});
    }

    onBeerAbvChange(e) {
        this.setState({beer_abv: e.target.value});
    }

    onGrainTypeChange(e) {
        this.setState({grain_type: e.target.value});
    }

    onGrainAmountChange(e) {
        this.setState({grain_amount: e.target.value});
    }

    onHopsTypeChange(e) {
        this.setState({hops_type: e.target.value});
    }

    onHopsAmountChange(e) {
        this.setState({hops_amount: e.target.value});
    }

    onYeastTypeChange(e) {
        this.setState({yeast_type: e.target.value});
    }

    onYeastAmountChange(e) {
        this.setState({yeast_amount: e.target.value});
    }

    onOtherTypeChange(e) {
        this.setState({other_type: e.target.value});
    }

    onOtherAmountChange(e) {
        this.setState({other_amount: e.target.value});
    }

    onBrewInstructionsChange(e) {
        this.setState({brew_instructions: e.target.value});
    }

    onBatchSizeChange(e) {
        this.setState({batch_size: e.target.value});
    }

    onBrewDifficultyChange(e) {
        this.setState({brew_difficulty: e.target.value});
    }

    onFinalGravChange(e) {
        this.setState({final_grav: e.target.value});
    }

    onOrigGravChange(e) {
        this.setState({orig_grav: e.target.value});
    }

    onAddGrains() {
        this.setState({
            grains_list: [
                {
                    grain_type: this.state.grain_type,
                    grain_amount: this.state.grain_amount
                }
            ]
        }, this.checkGrainState());
    }

    onAddHops() {
        this.setState({
            hops_list: [
                ...this.state.hops_list,
                {
                    hops_type: this.state.hops_type,
                    hops_amount: this.state.hops_amount
                }
            ]
        })
    }

    onAddYeast() {
        this.setState({
            yeast_list: [
                ...this.state.yeast_list,
                {
                    yeast_type: this.state.yeast_type,
                    yeast_amount: this.state.yeast_amount
                }
            ]
        })
    }

    onAddOther() {
        this.setState({
            other_list: [
                ...this.state.other_list,
                {
                    other_type: this.state.other_type,
                    other_amount: this.state.other_amount
                }
            ]
        })
    }

    checkGrainState() {
        console.log(this.state.grain_type);
        console.log(this.state.grain_amount);
        console.log(this.state.grains_list);
    }

    checkState() {
        console.log(this.state);
    }

    handleSubmit(e) {

        e.preventDefault();
        var recipe = {
            beer_name: this.state.beer_name,
            beer_style: this.state.beer_style,
            beer_abv: this.state.beer_abv,
            orig_grav: this.state.orig_grav,
            final_grav: this.state.final_grav,
            brew_difficulty: this.state.brew_difficulty,
            batch_size: this.state.batch_size,
            brew_instructions: this.state.brew_instructions,
            grains_list: [
                {
                    grain_amount: this.state.grain_amount,
                    grain_type: this.state.grain_type
                }
            ],
            hops_list: [
                {
                    hops_amount: this.state.hops_amount,
                    hops_type: this.state.hops_type
                }
            ],
            yeast_list: [
                {
                    yeast_amount: this.state.yeast_amount,
                    yeast_type: this.state.yeast_type
                }
            ],
            other_list: [
                {
                    other_amount: this.state.other_amount,
                    other_type: this.state.other_type
                }
            ],
        }
        // console.log('grains_list is: ', this.state.grains_list);
        // axios.post('http://localhost:8080/new-recipe', {
        //     recipe
        // })
        // .then(res => {
        //     console.log(res);
        // })

        // fetch('http://localhost:8080/new-recipe', {
        //     method: 'post',
        //     headers: new Headers({'content-type': 'application/json'}),
        //     body: JSON.stringify(recipe)
        // }).then(function(response) {
        //     console.log(response.type); // "opaque"
        // });

    }

    renderContent() {

        switch(this.props.auth) {
            case null:
                return <h3>Loading...</h3>;
            case false:
                return(
                    <div>
                        <h3>Please log in or create an account to create new recipes</h3>
                        <Button style={loginBtnStyle} color="inherit">
                            <a href="/auth/google">Login</a>
                        </Button>
                    </div>
                );
            default:
                return(
                    <div style={formContainer}>
                        <div style={formHeader}>
                            <h2>Create a new recipe!</h2>
                        </div>
                        <form className="form-horizontal" method="post" action="http://localhost:8080/new-recipe">
                        <div id="beerForm">

                            <div className="form-group">
                            <span className="col-sm-3 control-label">Beer Name: </span>
                            <span className="col-sm-9">
                                <input 
                                    name="beer_name" 
                                    className="form-control" 
                                    type="text"
                                    value={this.state.beer_name}
                                    onChange={this.onBeerNameChange}
                                />
                            </span>
                            </div>

                            <div className="form-group">
                            <span className="col-sm-3 control-label">Beer Style: </span>
                            <span className="col-sm-9">
                                <input 
                                    name="beer_style" 
                                    className="form-control" 
                                    type="text"
                                    value={this.state.beer_style}
                                    onChange={this.onBeerStyleChange}
                                />
                            </span>
                            </div>

                            <div className="form-group">
                            <span className="col-sm-3 control-label">Beer ABV: </span>
                            <span className="col-sm-9">
                                <input 
                                    name="beer_abv" 
                                    className="form-control" 
                                    type="text"
                                    value={this.state.beer_abv}
                                    onChange={this.onBeerAbvChange}
                                />
                            </span>
                            </div>

                            <div style={sectionStyle}>
                            <h4>Grains</h4>
                            <div>
                                <div>Repeat grains here</div>
                                <span>Grain types: </span> <span> Grain amounts</span>
                            </div>
                            <div className="form-group">
                                <span className="col-sm-3 control-label">Grain Type: </span>
                                <span className="col-sm-9">
                                    <input 
                                        name="grain_type" 
                                        className="form-control" 
                                        type="text"
                                        value={this.state.grain_type}
                                        onChange={this.onGrainTypeChange}
                                    />
                                </span>
                            </div>
                            <div className="form-group">
                                <span className="col-sm-3 control-label">Grain Amount: </span>
                                <span className="col-sm-9">
                                    <input 
                                        name="grain_amount" 
                                        className="form-control" 
                                        type="text"
                                        value={this.state.grain_amount}
                                        onChange={this.onGrainAmountChange}
                                    />
                                </span>
                            </div>
                            </div>
                            <div 
                                className="btn btn-large btn-primary" 
                                onClick={this.onAddGrains}>
                                Add These Grains
                            </div>

                            <div style={sectionStyle}>
                            <h4>Hops</h4>
                            <div>
                            <div>Repeat hops here</div>
                                <span>Hops type: </span> <span> hops amount</span>
                            </div>
                            <div className="form-group">
                                <span className="col-sm-3 control-label">Hops Type: </span>
                                <span className="col-sm-9">
                                    <input 
                                        name="hops_type" 
                                        className="form-control" 
                                        type="text"
                                        value={this.state.hops_type}
                                        onChange={this.onHopsTypeChange}
                                    />
                                </span>
                            </div>
                            <div className="form-group">
                                <span className="col-sm-3 control-label">Hops Amount: </span>
                                <span className="col-sm-9">
                                    <input 
                                        name="hops_amount" 
                                        className="form-control" 
                                        type="text"
                                        value={this.state.hops_amount}
                                        onChange={this.onHopsAmountChange}
                                    />
                                </span>
                            </div>
                            </div>
                            <div 
                                className="btn btn-large btn-primary" 
                                onClick={this.onAddHops}>
                                Add These Hops
                            </div>

                            <div style={sectionStyle}>
                            <h4>Yeast</h4>
                            <div>
                            <div>Repeat yeast here</div>
                                <span>Yeast type: </span> <span> yeast amount</span>
                            </div>
                            <div className="form-group">
                                <span className="col-sm-3 control-label">Yeast Type: </span>
                                <span className="col-sm-9">
                                    <input 
                                        name="yeast_type" 
                                        className="form-control" 
                                        type="text"
                                        value={this.state.yeast_type}
                                        onChange={this.onYeastTypeChange}
                                    />
                                </span>
                            </div>
                            <div className="form-group">
                                <span className="col-sm-3 control-label">Yeast Amount: </span>
                                <span className="col-sm-9">
                                    <input 
                                        name="yeast_amount" 
                                        className="form-control" 
                                        type="text"
                                        value={this.state.yeast_amount}
                                        onChange={this.onYeastAmountChange}
                                    />
                                </span>
                            </div>
                            </div>
                            <div style={bottomStyle}>
                                <div 
                                    className="btn btn-large btn-primary"
                                    onClick={this.onAddYeast}>
                                    Add This Yeast
                                </div>
                            </div>


                            <div style={sectionStyle}>
                            <h4>Other Ingredients</h4>
                            <div>
                            <div>Repeat other here</div>
                                <span>Other type: </span> <span> Other amount</span>
                            </div>
                            <div className="form-group">
                                <span className="col-sm-3 control-label">Other Ingredient: </span>
                                <span className="col-sm-9">
                                    <input 
                                        name="other_type" 
                                        className="form-control" 
                                        type="text"
                                        value={this.state.other_type}
                                        onChange={this.onOtherTypeChange}
                                    />
                                </span>
                            </div>
                            <div className="form-group">
                                <span className="col-sm-3 control-label">Other Amount: </span>
                                <span className="col-sm-9">
                                    <input 
                                        name="other_amount" 
                                        className="form-control" 
                                        type="text"
                                        value={this.state.other_amount}
                                        onChange={this.onOtherAmountChange}
                                    />
                                </span>
                            </div>
                            </div>
                            <div style={bottomStyle}>
                            <div 
                                className="btn btn-large btn-primary"
                                onClick={this.onAddOther}>
                                Add This Ingredient
                                </div>
                            </div>


                            <div className="form-group">
                            <span className="col-sm-3 control-label">Original Gravity: </span>
                            <span className="col-sm-9">
                                <input 
                                    name="orig_grav" 
                                    className="form-control" 
                                    type="text"
                                    value={this.state.orig_grav}
                                    onChange={this.onOrigGravChange}
                                />
                            </span>
                            </div>

                            <div className="form-group">
                            <span className="col-sm-3 control-label">Final Gravity: </span>
                            <span className="col-sm-9">
                                <input 
                                    name="final_grav" 
                                    className="form-control" 
                                    type="text"
                                    value={this.state.final_grav}
                                    onChange={this.onFinalGravChange}
                                />
                            </span>
                            </div>

                            <div className="form-group">
                            <span className="col-sm-3 control-label">Brew Difficulty: </span>
                            <span className="col-sm-9">
                                <select 
                                    name="brew_difficulty" 
                                    className="form-control"
                                    value={this.state.brew_difficulty}
                                    onChange={this.onBrewDifficultyChange}
                                >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Advanced">Advanced</option>
                                </select>
                            </span>
                            </div>

                            <div className="form-group">
                            <span className="col-sm-3 control-label">Batch Size: </span>
                            <span className="col-sm-9">
                                <select 
                                    name="batch_size" 
                                    className="form-control"
                                    value={this.state.batch_size}
                                    onChange={this.onBatchSizeChange}
                                >
                                <option value="1">1 gal</option>
                                <option value="3">3 gal</option>
                                <option value="5">5 gal</option>
                                </select>
                            </span>
                            </div>

                            <div className="form-group">
                            <span className="col-sm-3 control-label">Instructions: </span>
                            <span className="col-sm-9">
                                <textarea 
                                    name="brew_instructions" 
                                    className="form-control" 
                                    rows="12" 
                                    type="textarea" 
                                    value={this.state.brew_instructions} 
                                    onChange={this.onBrewInstructionsChange}
                                />
                            </span>
                            </div>

                            <div>
                            <p></p>
                                <button 
                                    type="submit" 
                                    value="Create Recipe" 
                                    className="btn btn-large btn-primary btn-input">
                                    Submit
                                </button>
                            </div>
                            <p></p>
                        </div>
                        
                        <input type="hidden" name="grains_list" value={this.state.grains_list}/>
                        <input type="hidden" name="hops_list" value={this.state.hops_list}/>
                        <input type="hidden" name="yeast_list" value={this.state.yeast_list}/>
                        <input type="hidden" name="other_list" value={this.state.other_list}/>

                        </form>
                        <div>
                            <p></p>
                                <div 
                                    onClick={this.checkState}
                                    className="btn btn-large btn-primary btn-input">
                                    Check state
                                </div>
                            </div>
                    </div>
                );
        }
    }

    render() {

        return (
          <div>
           {this.renderContent()}
          </div>
        );

    }
}

function mapStateToProps({auth}) {
    return {auth};
}

export default connect(mapStateToProps)(NewRecipe);
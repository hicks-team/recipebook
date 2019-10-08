import React from 'react';
import recipeData from './recipes.json';
import Recipe from './components/Recipe';
import RecipePicker from './components/RecipePicker';
import Navbar from "./components/Navbar";
import Sidebar from "react-sidebar";

const mql = window.matchMedia(`(min-width: ` + (768 + 286) + `px)`);

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.handleClickRecipe = this.handleClickRecipe.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);

        this.state = {
            recipes: recipeData,
            selectedRecipeId: 1,
            sidebarDocked: mql.matches,
            sidebarOpen: false
        }
    }

    handleClickRecipe(id) {
        this.setState({ selectedRecipeId: id });
    }

    componentDidMount() {
        mql.addEventListener("change", this.mediaQueryChanged);
    }

    componentWillUnmount() {
        mql.removeEventListener("change", this.mediaQueryChanged);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    mediaQueryChanged() {
        this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
    }

    render() {
        const selectedRecipe = recipeData.find(item => item.id === this.state.selectedRecipeId);

        return (
            <>
                <Sidebar
                    sidebar={
                        <RecipePicker
                            onClickRecipe={this.handleClickRecipe}
                            currentlySelected={this.state.selectedRecipeId}
                            recipes={recipeData}/>
                    }
                    open={this.state.sidebarOpen}
                    docked={this.state.sidebarDocked}
                    onSetOpen={this.onSetSidebarOpen}

                    styles={{ sidebar: { background: "white" } }}
                    touchHandleWidth={40}
                >

                    <Navbar recipe={selectedRecipe} />
                    <section className={"hero is-info"}>
                        <div className={"hero-body"}>
                            <div className={"container"}>
                                <h1 className='title'>{selectedRecipe.name}</h1>
                                <h3 className='subtitle'>Cooking Time: {selectedRecipe["Cooking Time"]} - Difficulty: {selectedRecipe.difficulty}</h3>
                            </div>
                        </div>
                    </section>

                    <section className={"section"}>
                        <div className={'container'}>
                            <div className={'columns'}>
                                <Recipe recipe={selectedRecipe} />
                            </div>
                        </div>
                    </section>
                </Sidebar>
            </>
        );
    }
}
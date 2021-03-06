import * as React from "react"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { BaseReduxProps } from "../Interfaces"
import { PreferencesPage, AccountPage, PlacesPage, FavoritesPage } from "./Components"
import { CLOSE_SETTINGS_PAGE } from "../actions/actions"



export class PreferencesContainer extends React.Component<BaseReduxProps, any> {

    constructor(props) {
        super(props)

    }

    private unsubscribe: Function;

    componentDidMount() {
        const { store } = this.props;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate()
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }


    private closePage = () => {

        return this.props.store.dispatch(CLOSE_SETTINGS_PAGE())
    }


    private choosePage = () => {
        const page = this.props.store.getState().settingsPages.page
        // console.log(page)
        if (page === "preferences") {
            return <PreferencesPage onClick={this.closePage} />
        } else if (page === "account") {
            return <AccountPage onClick={this.closePage} store={this.props.store} />;
        } else if (page === "places") {
            return <PlacesPage onClick={this.closePage} store={this.props.store} />;
        } else if (page === "favorites") {
            return <FavoritesPage onClick={this.closePage} store={this.props.store} />;
        } else {
            return
        }
    }
    render() {
        return (
            <div>
                <ReactCSSTransitionGroup
                    transitionName="prefPanel"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {this.choosePage()}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

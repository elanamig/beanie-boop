import React, { Component } from 'react';
//import {MdPerson} from 'react-icons/lib/md';
import {withRouter,Link} from 'react-router-dom'
import {TiShoppingCart,TiUserOutline} from 'react-icons/lib/ti';
import { Input, Icon, Modal, Header, Dropdown,Label} from 'semantic-ui-react'

import {Login} from './index'


const trigger = (
  <span>
    <TiUserOutline size={30} style={{
			color: "rgba(0,0,0,.4)",
			marginLeft: "30px",
			marginRight: "-10px",
		}}/>
  </span>
)

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
			dropdown: false
		};
	}
	render() {
		const {cart,history, user, loggedIn,logout, changeSearch, toggleCart} = this.props
		return (
			<div style={container}>
				<Link to="/">
					<img style={logo} src="/ty-logo.png"></img>
				</Link>

				<div style={searchBar}>
					<Input
					fluid
					input={{style:{border: '2px solid #ccc'}}}
		    	icon={{ name: 'search', link: true, style: {color: "#ccc",fontSize: '20px' }}}
		    	placeholder='Search...'
					onChange={(event, data)=> {
						changeSearch(data.value)
					}}
		  	/>
				</div>
				<div style={cartContainer}>
					<TiShoppingCart size={30} onClick={toggleCart} style={cart.length ? cartIcon: emptyCart}/>
					{cart.length ? <div style={styles.label}>{cart.length}</div> : ""}
				</div>
				{loggedIn ? (
					<div style={{marginRight: "30px"}}>
						<Dropdown className="profileDropdown left" floating trigger={trigger}>
							<Dropdown.Menu>
								<Dropdown.Item onClick={()=>logout()}>
									<Icon name='log out' className='left floated' />
        					Logout
								</Dropdown.Item>
								{user.isAdmin &&
									<Dropdown.Item onClick={()=>history.push("/admin/users")}>
										<Icon name='setting' className='left floated' />
	        					Admin
									</Dropdown.Item>
								}
							</Dropdown.Menu>
						</Dropdown>
					</div>
				)
				: <p style={styles.loginText} onClick={()=>{this.setState({modalOpen: true})}}>Login / Sign Up</p>}
				<Modal size="small" open={this.state.modalOpen} onClose={()=>this.setState({modalOpen: false})}>
			    <Modal.Header>Log In</Modal.Header>
			    <Modal.Content>
			      <Modal.Description>
							<Login closeModal={()=>this.setState({modalOpen: false})} />
			      </Modal.Description>
			    </Modal.Content>
			  </Modal>
			</div>
		);
	}

}

const styles = {
	label: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: "white",
		background:"red",
		fontSize: "10px",
		width: '15px',
		height: "15px",
		borderRadius: "15px",
		position: 'relative',
		top: "-10px",
		left: '-10px'
	},
	container: {
		background: 'white',
		height: "55px",
		display: 'flex',
		alignItems: 'center',
		borderBottom: "2px solid #ccc"
	},
	cartContainer: {
		display: 'flex',
		alignItems: 'center'
	},
	loginText: {
		color: "rgba(0,0,0,.4)",
		fontSize: '16px',
		marginLeft: "10px",
		marginRight: "10px",
	},
	cartIcon: {
		color: "rgba(0,0,0,.4)",
		marginLeft: "10px"
	},
	emptyCart: {
		color: "white",
		marginLeft: "10px"
	},
	profileIcon: {
		color: "rgba(0,0,0,.4)",
		marginLeft: "30px",
		marginRight: "30px",
	},
	logo: {
		marginLeft: "30px",
		marginRight: "30px",
		height: "40px"
	},
	searchBar:{
		paddingRight: '100px',
		paddingLeft: '100px',
		flex: 1,
		justifyContent: 'center'
	}
}
//<TiUserOutline onClick={()=>logout()} size={30} style={profileIcon}/>
const {container, logo, profileIcon, searchBar, cartContainer, cartIcon, emptyCart} = styles
export default withRouter(NavBar);

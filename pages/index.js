import React, { useContext } from "react";
import Cart from "../components/cart"
import {ApolloProvider,ApolloClient,HttpLink, InMemoryCache} from '@apollo/client';
import RestaurantList from '../components/restaurantList';
import AppContext from "../components/context";
import { Card } from "../components/card";
import Router from "next/router";

function Home() {
	const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
	const { restaurantQuery, currentUser } = useContext(AppContext);
	const link = new HttpLink({ uri: `${API_URL}/graphql`})
	const cache = new InMemoryCache()
	const client = new ApolloClient({link,cache});
 
	return (
		<ApolloProvider client={client}>
			{currentUser ? ( 
				<div className="grid">
					<RestaurantList className="restuarant-col" search={restaurantQuery} />
					<Cart className="cart-col"></Cart>
				</div>
			):(
				<Card
					header="Please Log In to Shop"
					body= {
						<>
							<button
								id="account submit"
								type="submit"
								className="btn btn-info"
								onClick={() => Router.push("/login")}
							>Log In</button>
							<br></br>
							<br></br>
							<button
								id="account submit"
								type="submit"
								className="btn btn-info"
								onClick={() => Router.push("/register")}
							>Create Account</button>
						</>
					}
				></Card>
			)}   
		</ApolloProvider>
	);
}

export default Home; 
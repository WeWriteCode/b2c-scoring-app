import React from 'react';
import { Link } from "react-router-dom";
 
import CityGridSquare from "./CityGridSquare";
import TileSelect from "./TileSelect";

function City(props) {
	var urlParams = new URLSearchParams(window.location.search);
	var token = urlParams.get('token');
	var game = urlParams.get('game');
	var cityData = (props.cities.filter(obj => obj["token"] === token))[0];
	var gridSize = game === "b2c" ? "four-by-four" : "five-by-five";
	
	function drawCityGrid(tiles){
		var grid = tiles.map((tile, index) => {
			return <CityGridSquare type={tile.type} typeSpecial={tile.typeSpecial} showSelectTileModal={props.showSelectTileModal} number={index} city={token} key={index} />
		});

		return (
			<ol className={`city-grid ${gridSize}`}>
				{grid}
			</ol>
		);
	}

	function renderGroups(arr){
		var groups = arr.map((group, index) => {
			return (
				<p key={`${group}-${index}`}>
					{`Group of ${group.length}`}
				</p>
			);
		});

		return (
			<React.Fragment>
				{groups}
			</React.Fragment>
		);
	}

	function drawScores(score, game){
		return (
			<div>
				<table className="city-score-table">
					<colgroup>
						<col className='tile' />
						<col className='number' />
						<col className='bonus' />
						<col className='score' />
					</colgroup>
					<thead>
						<tr>
							<th>Tile</th>
							<th>#</th>
							<th>Bonus</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<img alt="Factory icon" className="image-tile-icon" src="/img/tile-house.gif" />
								Factory
							</td>
							<td>
								{score.numFactories}
							</td>
							<td>
								x{score.factoryMultiplier }
							</td>
							<td>
								{score.totalScoreFactories}
							</td>
						</tr>
						<tr>
							<td>
								<img alt="Office icon" className="image-tile-icon" src="/img/tile-house.gif" />
								Office
							</td>
							<td>
								{score.numOffices}
							</td>
							<td>
								{score.officesNextToTaverns > 0 ? `Offices by Taverns: ${score.officesNextToTaverns}` : ""}
							</td>
							<td>
								{score.totalScoreOffices}
							</td>
						</tr>
						<tr>
							<td>
								<img alt="House icon" className="image-tile-icon" src="/img/tile-house.gif" />
								House
							</td>
							<td>
								{score.numHouses}
							</td>
							<td>
								{score.nonHouseTypes > 0 ? `Non-Houses: ${score.nonHouseTypes}` : ""}
								{score.housesNextToFactories > 0 ? `Houses next to Factory: ${score.housesNextToFactories}` : ""}
							</td>
							<td>
								{score.totalScoreHouses}
							</td>
						</tr>
						<tr>
							<td>
								<img alt="Park icon" className="image-tile-icon" src="/img/tile-house.gif" />
								Park
							</td>
							<td>
								{score.numParks}
							</td>
							<td>
								{score.parkGroups.length > 0 ? renderGroups(score.parkGroups) : "" }
							</td>
							<td>
								{score.totalScoreParks}
							</td>
						</tr>
						<tr>
							<td>
								<img alt="Shop icon" className="image-tile-icon" src="/img/tile-house.gif" />
								Shop
							</td>
							<td>
								{score.numShops}
							</td>
							<td>
								{score.shopGroups.length > 0 ? renderGroups(score.shopGroups) : "" }
							</td>
							<td>
								{score.totalScoreShops}
							</td>
						</tr>
						<tr>
							<td>
								<img alt="Tavern icon" className="image-tile-icon" src="/img/tile-tavern-music.gif" />
								Tavern
							</td>
							<td>
								{score.numTaverns}
							</td>
							<td>
								{score.uniqueTaverns > 0 ? `Taverns Types: ${score.uniqueTaverns}` : ""}
							</td>
							<td>
								{score.totalScoreTaverns}
							</td>
						</tr>
					</tbody>
				</table>
				<h2 className="city-total-score">
					<strong>{score.totalScore}</strong>
					<small>City Total</small>
				</h2>
			</div>
		);
	}

	return (
		<div>
			<header>
				<Link to="/between-two-cities" className="link-back">
					Back
				</Link>
				<h1>
					<img className="image-city-token" src={`/img/token-${cityData.token}.gif`} />
					{cityData.name}
				</h1>
			</header>
			
			{drawCityGrid(cityData.tiles)}

			{drawScores(cityData.score)}

			{props.isSelectTileModalVisible === false ? null : 
				<TileSelect tavernTypes={props.tavernTypes} chooseTile={props.chooseTile} tiles={props.tiles} />
			}
		</div>
	);
}

export default City;

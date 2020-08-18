const css = `.container {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	margin: 1rem;
}

.container > figure {
	box-shadow: 0px 0px 3px 1px #12131411;
	margin: 0.5rem;
	width: 5rem;
	height: 5rem;
	padding: 1rem 0 0 0;
	text-align: center;
	box-sizing: border-box;
	position: relative;
	border-radius: 4px;
	overflow: hidden;
	color: #eee;
	fill: #eee;
}

.container > figure > vwc-icon {
	color: #121314;
}

.container > figure > figcaption {
	font-size: 0.2rem;
	position: absolute;
	bottom: 0;
	left: 0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
	box-sizing: border-box;
	font-weight: bold;
	color: #121314;
	background-color: #12131422;
	padding: 0.2rem;
}`;

export default css;
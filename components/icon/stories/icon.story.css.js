const css = `.container {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	margin: 20px;
}

.container > figure {
	margin: 8px;
	box-shadow: 0px 0px 3px 1px #12131411;
	padding: 14px 50px 26px 50px;
	text-align: center;
	box-sizing: border-box;
	position: relative;
	border-radius: 4px;
	overflow: hidden;
}

.container > figure > vwc-icon {
	color: #121314;
}

.container > figure > figcaption {
	font-size: 10px;
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
	line-height: 18px;
	padding: 0;
}`;

export default css;
const css = `.container {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	margin: 1rem;
}

.container > figure {
	box-shadow: 1px 1px 3px 1px #ddd;
	margin: 0.5rem;
	width: 5rem;
	height: 5rem;
	padding: 1rem 0 0 0;
	text-align: center;
	box-sizing: border-box;
	position: relative;
	background-color: #eee;
	border-radius: 4px;
	overflow: hidden;
	color: #eee;
	fill: #eee;
}

.container > figure:nth-child(5n+1)  { background-color: #FA97AA; }
.container > figure:nth-child(5n+2)  { background-color: #F876C2; }
.container > figure:nth-child(5n+3)  { background-color: #A93CF8; }
.container > figure:nth-child(5n+4)  { background-color: #8D9BFA; }
.container > figure:nth-child(5n+5)  { background-color: #F75CDA; }

.container > figure > vwc-icon {
	box-shadow: 3px 3px 3px rgba(0,0,0,0);
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
	color: #eee;
	background-color: #00000025;
	padding: 0.2rem;
}`;

export default css;
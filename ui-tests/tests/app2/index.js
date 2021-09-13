import '@vonage/vwc-side-drawer';
import '@vonage/vwc-top-app-bar-fixed';

export async function createElementVariations(wrapper) {
	const elementWrapper = document.createElement('div');
	elementWrapper.innerHTML = `
	<style>
	html {
		block-size: 100%;
	}
	body {
		min-block-size: 100%;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		justify-content: center;
		grid-auto-flow: dense;
	}
	</style>

	<vwc-side-drawer>
  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti voluptate rem velit accusantium quasi, aliquid natus, aperiam officiis repellendus reprehenderit sapiente commodi cum deserunt quae illo blanditiis. Quasi, ullam totam.</p>
</vwc-side-drawer>
<main>
  <h2>Main</h2>
  <p>
    This demonstrates basic support for application with <code>vwc-side-drawer</code>.
  </p>
</main>
	`;
	wrapper.appendChild(elementWrapper);
}



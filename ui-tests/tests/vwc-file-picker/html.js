export 	const filePickersHTML = `
	<vwc-file-picker
   label
   helper
   notafileerror="only file/s drop allowed"
   toomanyfileserror="only one file allowed"
   drop-zone
   >
		<input type="file" name="some-file" />
	</vwc-file-picker>

	<vwc-file-picker
		style="--vvd-file-picker-min-height: 60px; --vvd-file-picker-min-width: 200px;"
		label
		helper
		notafileerror="only file/s drop allowed"
		toomanyfileserror="only one file allowed"
		drop-zone
		>
		<input type="file" name="fi-name" />
	</vwc-file-picker>

	<vwc-file-picker
		label="Pick up your image"
		helper
		notafileerror="only file/s drop allowed"
		toomanyfileserror="only one file allowed"
		drop-zone
		>
		<input type="file" name="fi-name" />
	</vwc-file-picker>

	<vwc-file-picker
		label="Pick up your image"
		helper="some useful text here"
		notafileerror="only file/s drop allowed"
		toomanyfileserror="only one file allowed"
		drop-zone
		>
		<input type="file" name="fi-name" />
	</vwc-file-picker>

	<vwc-file-picker
		label="Pick up your image"
		helper
		notafileerror="only file/s drop allowed"
		toomanyfileserror="only one file allowed"
		drop-zone
		>
		<input type="file" name="fi-name" />
		<span slot="dd-hint">Drop &amp; Forget</span>
	</vwc-file-picker>

	<vwc-file-picker
		label="Pick up your image"
		helper="drag and drop your files onto the surface"
		notafileerror="only file/s drop allowed"
		toomanyfileserror="only one file allowed"
		drop-zone
		>
		<input type="file" name="fi-name" />
		<span slot="dd-hint"></span>
	</vwc-file-picker>

	<vwc-file-picker
		drop-zone
		label
		helper
		notafileerror="only file/s drop allowed"
		toomanyfileserror="only one file allowed"
		>
		<input type="file" name="some-file" />
		<span slot="dd-hint"></span>
		<vwc-button
				slot="button"
				type="button"
				layout="filled"
				icon="upload"
				trailingicon
				unelevated
				>
				Select files
				<button type="button" style="display: none;"></button>
		</vwc-button>
	</vwc-file-picker>

	<vwc-file-picker
		label="Select your PDF"
		helper
		notafileerror="only file/s drop allowed"
		toomanyfileserror="only one file allowed"
		drop-zone
		>
		<input type="file" name="fi-name" />
		<span slot="dd-hint"></span>
		<vwc-button
				slot="button"
				type="button"
				layout="filled"
				icon="upload"
				trailingicon
				unelevated
				>
				Select files
				<button type="button" style="display: none;"></button>
		</vwc-button>
	</vwc-file-picker>

	<vwc-file-picker
		label="Select your file"
		helper
		notafileerror="only file/s drop allowed"
		toomanyfileserror="only one file allowed"
		drop-zone
		>
		<input type="file" name="fi-name" />
		<span slot="dd-hint"></span>
		<span style="text-decoration: underline; cursor: pointer" slot="button">
		Click here to select files
		</span>
	</vwc-file-picker>

	<vwc-file-picker
		label="Select your files"
		helper="drag and drop or select b file selector"
		notafileerror="only file/s drop allowed"
		toomanyfileserror="only one file allowed"
		drop-zone
		>
		<input type="file" name="fi-name" />
		<span slot="dd-hint">Drag them all or</span>
		<vwc-button
				slot="button"
				type="button"
				layout="filled"
				icon="upload"
				trailingicon
				unelevated
				>
				Select Files
				<button type="button" style="display: none;"></button>
		</vwc-button>
	</vwc-file-picker>
	`;

import buildDetails from './prepare-sb-details.mjs';
import createStoriesFromMds from './create-stories-from-md.mjs';

buildDetails();
if (!process.env.CHROMATIC) await createStoriesFromMds();

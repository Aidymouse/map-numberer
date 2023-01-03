import * as ghpages from 'gh-pages';

ghpages.publish(
    'dist', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/Aidymouse/map-numberer.git', // Update to point to your repository
        user: {
            name: 'Aidymouse', // update to use your name
            email: 'aidymouse4891@gmail.com', // Update to use your email
        },
        message: 'GH Pages Script',
    },
    () => {
        console.log('Deploy Complete!');
    }
);

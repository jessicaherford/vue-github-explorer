
// requiring Vue into our file using "node syntax"
var Vue = require('vue');

// setting a global config option to put our application in debug mode
// if we get an error we will get more information about it in the dev console
Vue.config.debug = true;
Vue.use(require('vue-resource'));

//Vue instance, we bind the instance to the element with the id of container
//The we initialize our instance with some data, best if its the data you want to use
// this insures that the Vue binds all the data we want it to
// in the instance we define the methods, the changeRepo method sipmly splits the
// vaule of the fullRepoName piece of data and assigns the first part to the username
// and the second part to the repo.
new Vue({
    el: '#container',
    data: {
        fullRepoName: '',
        username: '',
        repo: ''
    },
    methods: {
        changeRepo: function() {
            var splitData = this.fullRepoName.split('/');
            this.username = splitData[0];
            this.repo = splitData[1];

            console.group("Vue Data");
            console.log("fullRepoName:", this.fullRepoName);
            console.log("username:", this.username);
            console.log("repo:", this.repo);
            console.groupEnd("Vue Data");
        }
    },
    // telling the vue instance about our new components
    // this brings in the component from the given file
    // since no specific file is provided the default used is index.js
    components: {
        githubFileExplorer: require('./components/github-file-explorer')
    }
});

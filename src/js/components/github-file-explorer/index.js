// object being exported has all of the configurations for our component

module.exports = {
  //defining a template and bringing in the code form template.html
  // We are allowed to do this using browserify/partialify
    template: require('./template.html'),
    data: function() {
        return {
            path: '/',
            files: []
        };
    },
    //defining the properties this component will accept from its parent
    props: {
      //username and repo are objects defined within the props
      // allows for validations in order for the data in the Vue instance to be updated
        username: {
            type: String,
            required: true
        },
        repo: {
            type: String,
            required: true
        }
    },
    computed: {
        fullRepoUrl: function() {
            return this.username + '/' + this.repo;
        },
        sortedFiles: function() {
            return this.files.slice(0).sort(function(a, b) {
                if (a.type !== b.type) {
                    if (a.type === 'dir') {
                        return -1;
                    } else {
                        return 1;
                    }
                } else {
                    if (a.name < b.name) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
            });
        }
    },
    methods: {
        getFiles: function() {
            this.$http.get('https://api.github.com/repos/' + this.fullRepoUrl + '/contents' + this.path,
                function(data) {
                    this.files = data;
                }
            );
        },
        changePath: function(path) {
            this.path = '/' + path;
            this.getFiles();
        },
        goBack: function() {
            this.path = this.path.split('/').slice(0, -1).join('/');
            if (this.path === '') this.path = '/';

            this.getFiles();
        }
    },
    watch: {
        repo: function(newVal, oldVal) {
            this.path = '/';
            this.getFiles();
        }
    },
    created: function() {
        if (this.username && this.repo) this.getFiles();
    }
};

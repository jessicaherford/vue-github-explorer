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
      //since fullRepoUrl is not a part of the data it is a computed property
      // meaning it will be computed on the file whenever we need to use it
      // the name of the method becomes the name of the property we access
        fullRepoUrl: function() {
            return this.username + '/' + this.repo;
        },
        sortedFiles: function() {
          //sorts the files alphabetically
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
        // defining getFiles, hits the API and returns the file in the repository for the path specified
        // for the path specified
        getFiles: function() {
          //making the api call
            this.$http.get('https://api.github.com/repos/' + this.fullRepoUrl + '/contents' + this.path,
                //callback function
                function(data) {
                    this.files = data;
                }
            );
        },
        changePath: function(path) {
          //takes in a path passed in from the template, sets the path data property equal '/'path
          //then calls getfile() to update the files in our vue instance
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
      //if username and repo are set/true call getFiles function
      // this is a lifecycle method, it will be called when the this.username
      // and this.repo are true
        if (this.username && this.repo) this.getFiles();
    }
};

class Homepage extends React.Component{
        constructor(props){

            super(props);
            this.state={
                title:'',
                comment: '',
                posts: []
            }
            this.handleChange=this.handleChange.bind(this);
            this.handleSubmit=this.handleSubmit.bind(this);
            this.refreshPosts=this.refreshPosts.bind(this); 
        }
    
    
        handleChange=function(event){
            var name=event.target.name;
            var value=event.target.value
            this.setState({
                [name]:value
            })
        }


        handleSubmit=function(event){
            event.preventDefault();
    
            Util.postdata(
                '/api/homepage', {
                    title: this.state.title,
                    comment:this.state.comment
                }
            ).then(() => {
                alert("Comment successfully logged")
            })
            .catch(() => {
                alert("Comment failed to be logged")
            });
            
        }

        refreshPosts=function(event){
            Util.getdata('/api/homepage').then(posts => {
                this.setState({ posts });
            });
        }

    render(){
        return(
            <div id="homepage">
                <div id="banner"> <h1>Join today to post your knowledge to the outside world. <br></br> Add your posts in down below! </h1> <h2>Please make sure you are signed in.</h2> </div>
                <div id="post"> 
                    <form onSubmit={this.handleSubmit} inline>
                        <label>
                        Title:
                        </label>
                        <input name="title"  value={this.state.title} onChange={this.handleChange} type="text"/>
                        <label>
                        Comment: 
                        </label> 
                        <textarea name="comment" cols="30" row="10"  value={this.state.comment} onChange={this.handleChange}></textarea>
                        <input type="submit" />
                    </form> 
                </div> 

                <div id="posts">
                    <button type="button" onClick={this.refreshPosts}>Show comments posted</button>
                    {   this.state.posts.map(post => {
                            return(
                              <div id="comments">
                                <h3>{post.title}- by @{post.author}</h3> 
                                <p>{post.comment}</p>
                              </div>    
                            )
                        })
                    }
                </div> 
            </div>  
        );
    }
}
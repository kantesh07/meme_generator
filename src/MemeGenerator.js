import React, {Component} from 'react'

class MemeGenerator extends Component {
    constructor(){
        super()
        this.state={
            toptext:'',
            bottomtext:'',
            randomimg:'https://i.imgflip.com/1bij.jpg',
            allmemeimg: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentDidMount() {
        fetch('https://i.imgflip.com/get_memes')
        .then(response=>response.jason())
        .then(response=>{
            const {memes}=response.data
            console.log(memes[0])
            this.setState({
                allmemeimg: memes
            })
        })
    }

    handleChange(event) {
       const {name, value} = event.target
       this.setState({
           [name]:value
       })        
    }

    handleSubmit(event){
        event.preventDefault()
        const randnum = Math.floor(Math.random() * this.state.allmemeimg.length)
        const randomMemeImg = this.state.allmemeimg[randnum].url
        this.setState({
            randomimg:randomMemeImg
        })
    }
    
    render() {
        return (
            <div>
                <form className='meme-form' onSubmit='this.handleSubmit'>
                    <input value={this.state.name} name='toptext' placeholder='top text' onChange={this.handleChange}/>
                    <input value={this.state.name} name='bottomtext' placeholder='bottom text' onChange={this.handleChange}/>
                    <button >Gen</button>
                </form>
                <div className='meme'>
                    <img className='' src={this.state.randomimg} alt=''/>
                    <h2 className='top'>{this.state.toptext}</h2>
                    <h2 className='bottom'>{this.state.bottomtext}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator
import Hero from "./Hero"; 
import renderer from 'react-test-renderer'

describe('Hero.jsx', () =>{
    it('should correcly', () =>{
        const tree = renderer.create(<Hero/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
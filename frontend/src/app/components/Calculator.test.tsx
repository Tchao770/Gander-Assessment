import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Calculator } from './Calculator';

Enzyme.configure({ adapter: new Adapter() });


it('Button is disabled', () => {
    const calculator = Enzyme.shallow(
        <Calculator />)
    const button = calculator.find('#addbutton')
    expect(button.prop('disabled')).toBe(true);
});

it('Button is enabled when input fields populated', () => {
    const calculator = Enzyme.shallow(
        <Calculator />)

    const input1 = calculator.find('#first')
    const input2 = calculator.find('#second')

    input1.simulate('change', { target: { value: '1' } })
    input2.simulate('change', { target: { value: '2' } })

    const button = calculator.find('#addbutton')
    expect(button.prop('disabled')).toBe(false);
});
import React from 'react';
import { shallow } from 'enzyme';
import DayCard from '../components/DayCard';

describe('DayCard component tests', () => {
    it('renders with props', () => {
        const props = {
            day: 'Monday',
            img: '/img1',
            windSpeed: 2,
            windDirection: 'N',
            temperature: 12
        }

        const wrapper = shallow(<DayCard {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
})
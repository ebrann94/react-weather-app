import React from 'react';
import { shallow, mount } from 'enzyme';
import Search from '../components/Search';
import { isFlowBaseAnnotation } from '@babel/types';

describe('Search component tests', () => {
    it('renders without crashing', () => {
        const props = {
            handleLocation: jest.fn(),
            apiError: false
        }
        const wrapper = shallow(<Search {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('updates state on input change', () => {
        const props = {
            handleLocation: jest.fn(),
            apiError: false
        }
        const event = {
            target: {
                value: 'London'
            }
        }
        const wrapper = mount(<Search {...props} />);
        expect(wrapper.find('input.location-input__text').props().value).toBe('');
        wrapper.find('input.location-input__text').simulate('change', event);
        expect(wrapper.find('input.location-input__text').props().value).toBe('London');
    });

    it('calls handleLocation on submit with location input', () => {
        const props = {
            handleLocation: jest.fn(),
            apiError: false
        }
        const changeEvent = {
            target: {
                value: 'London'
            }
        }
        const submitEvent = {
            preventDefault() {},
            target: {
                location: {
                    blur() {}
                }
            }
        }
        const wrapper = mount(<Search {...props}/>);
        wrapper.find('input.location-input__text').simulate('change', changeEvent);
        wrapper.find('form.location-form').simulate('submit', submitEvent);
        expect(props.handleLocation).toHaveBeenCalledWith('London');
    });

    it('renders error message when error', () => {
        const props = {
            handleLocation() {},
            apiError: true
        }
        const wrapper = shallow(<Search {...props} />);
        expect(wrapper.find('p.api-error').exists()).toBe(true);
    });
});
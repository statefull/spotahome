import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Homecard from 'components/Homecard';

Enzyme.configure({ adapter: new Adapter() });

describe('homecard', () => {
  it('layout', () => {
    const mockImageUrl = 'http://test.ts/test.jpg';
    const mockTitle = 'House test';
    const mockPrice = '300€';

    const wrapper = shallow(<Homecard title={mockTitle} price={mockPrice} image={mockImageUrl} />);

    const rootElement = wrapper.find('article.homecard');
    expect(rootElement).toHaveLength(1);

    const figure = rootElement.children('figure.homecard__image');
    expect(figure).toHaveLength(1);

    const image = figure.children('img');
    expect(image).toHaveLength(1);
    expect(image.prop('src')).toEqual(mockImageUrl);

    const description = rootElement.children('div.homecard__description');
    expect(description).toHaveLength(1);

    const information = description.children('div.homecard__description__information');
    expect(information).toHaveLength(1);

    const title = information.children('div.homecard__description__information__title');
    expect(title).toHaveLength(1);
    expect(title.text()).toEqual(mockTitle);

    const priceContainer = information.children('div.homecard__description__information__price');
    expect(priceContainer).toHaveLength(1);

    const price = priceContainer.children('div.homecard__description__information__price--yellow');
    expect(price).toHaveLength(1);
    expect(price.text()).toEqual(mockPrice);

    const actions = description.children('div.homecard__description__actions');
    expect(actions).toHaveLength(1);

    const moreDetails = actions.children('button.button.button--primary');
    expect(moreDetails).toHaveLength(1);

    const bookNow = actions.children('button.button.button--secondary');
    expect(bookNow).toHaveLength(1);
  });
});

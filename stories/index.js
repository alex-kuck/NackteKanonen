import React from 'react';
import { storiesOf } from '@storybook/react';

import {PlayerContainer} from '../src/App';

storiesOf('Nackte Kanonen', module)
    .add('IPlayer', () => (
        <PlayerContainer />
    ));
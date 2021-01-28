/*
 * HomePage
 *
 * Home sweet home
 *
 */

import React from 'react';

import HostEditorCard from '../HostEditorCard';

import {
  Checkbox,
  Date,
  Email,
  Number,
  Password,
  Radio,
  Range,
  Search,
  Text,
  Textarea,
} from '../../components/Input';
import {
  AsyncData,
  Condition,
  Container,
  ContainerRow,
  FormGroup,
  FormControl,
  List,
  OrderedList,
  ListItem,
} from '../../components/Wrapper';

export default function HomePage() {
  return (
    <div>
      <h1>HostEditorCard</h1>
      <HostEditorCard />
      <h2>Wrappers</h2>
      <h3>Container Wrapper</h3>
      <Container>
        <ContainerRow>Container Element</ContainerRow>
        <ContainerRow>Container Element</ContainerRow>
        <ContainerRow>Container Element</ContainerRow>
      </Container>
      <h3>Form Wrapper</h3>
      <FormGroup>
        <FormControl>Form Control</FormControl>
        <FormControl>Form Control</FormControl>
        <FormControl>Form Control</FormControl>
      </FormGroup>
      <h3>List Wrapper</h3>
      <List>
        <ListItem>List Item</ListItem>
        <ListItem>List Item</ListItem>
        <ListItem>List Item</ListItem>
      </List>
      <h3>OrderedList Wrapper</h3>
      <OrderedList>
        <ListItem>List Item</ListItem>
      </OrderedList>
      <h3>Condition Wrapper</h3>
      <Condition
        ifTrue={!!true}
        ComponentOnTrue="Render True First/"
        ComponentOnFalse="Render False Second/"
      />
      <Condition
        ifTrue={!!false}
        ComponentOnTrue="Render True First"
        ComponentOnFalse="Render False Second"
      />
      <h3>AsyncData Wrapper</h3>
      <AsyncData isLoading={!!true} asyncData={[1, 2]} component={Text} />
      <AsyncData isLoading={!!false} asyncData={[1, 2]} component={Text} />
      <h2>Inputs</h2>
      <Date placeholder="Date" />
      <h3>Password Input</h3>
      <Password label="Password" />
      <h3>Checkbox Input</h3>
      <Checkbox label="Box" onClick={() => {}} />
      <h3>Email Input</h3>
      <Email label="Email" />
      <h3>Radio Input</h3>
      <Radio label="Radio" />
      <h3>Range Input</h3>
      <Range label="Range" min={0} max={100} />
      <h3>Number Input</h3>
      <Number label="Number" />
      <h3>Search Input</h3>
      <Search label="Search" />
      <h3>Text Input</h3>
      <Text label="Text" />
      <h3>Textarea</h3>
      <Textarea
        label="Textarea"
        value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet feugiat purus vel tristique. Maecenas id metus rhoncus, sagittis purus mattis, porta velit. Ut vitae dui eget ex molestie luctus. Nunc et est eget metus auctor iaculis vel a dolor. Fusce a condimentum neque."
      />
    </div>
  );
}

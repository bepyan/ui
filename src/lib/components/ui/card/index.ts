import CardContent from './card-content.svelte';
import CardDescription from './card-description.svelte';
import CardFooter from './card-footer.svelte';
import CardHeader from './card-header.svelte';
import CardRoot from './card-root.svelte';
import CardTitle from './card-title.svelte';

const Card = CardRoot as typeof CardRoot & {
  Content: typeof CardContent;
  Description: typeof CardDescription;
  Footer: typeof CardFooter;
  Header: typeof CardHeader;
  Title: typeof CardTitle;
};

Card.Content = CardContent;
Card.Description = CardDescription;
Card.Footer = CardFooter;
Card.Header = CardHeader;
Card.Title = CardTitle;

export default Card;

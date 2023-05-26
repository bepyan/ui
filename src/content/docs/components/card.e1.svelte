<script>
  import Button from '$lib/components/ui/button.svelte';
  import Card from '$lib/components/ui/card';
  import Input from '$lib/components/ui/input.svelte';
  import Label from '$lib/components/ui/label.svelte';
</script>

<Card class="w-[350px]">
  <Card.Header>
    <Card.Title>Create project</Card.Title>
    <Card.Description>Deploy your new project in one-click.</Card.Description>
  </Card.Header>
  <Card.Content>
    <form>
      <div class="grid w-full items-center gap-4">
        <div class="flex flex-col space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Name of your project" />
        </div>
        <div class="flex flex-col space-y-1.5">
          <Label htmlFor="framework">Framework</Label>
          <Input id="framework" placeholder="Svelte" />
        </div>
      </div>
    </form>
  </Card.Content>
  <Card.Footer class="flex justify-between">
    <Button variant="ghost">Cancel</Button>
    <Button>Deploy</Button>
  </Card.Footer>
</Card>

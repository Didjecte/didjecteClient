<template>
  <div class="w-full">
    <h1 class="text-xl font-bold">
      Manga
    </h1>
    <div class="grid grid-cols-4 gap-3 mt-10">
    <div>
      <Card style="width: 25em">
        <template #header>
          <img alt="user header" src="/images/usercard.png" />
        </template>
        <template #title> Advanced Card </template>
        <template #subtitle> Card subtitle </template>
        <template #content>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
            quas!
          </p>
        </template>
        <template #footer>
          <Button icon="pi pi-check" label="Save" />
          <Button icon="pi pi-times" label="Cancel" severity="secondary" style="margin-left: 0.5em" />
        </template>
      </Card>
    </div>
    <div>2</div>
    </div>
  </div>
</template>

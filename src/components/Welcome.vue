<template>
  <div class="welcome">
    <h1> Got Time for a Quiz? </h1>
    <div class="description">
      <span>
        Answer questions (from StackOverflow),
      </span>
      <span>
        <em>without</em> looking up StackOverflow
      </span>
    </div>
    <div class="options">
      <div class="selected-tags">
        <span class="desc-text"> Select Tags (at most 3) </span>
        <multiselect
          v-model="selectedTags"
          :options="tags"
          :multiple="true"
          :searchable="true"
          :limit="3">
        </multiselect>
      </div>

      <div class="excluded-tags">
        <span class="desc-text"> Exclude Tags (at most 3)</span>
        <multiselect
          v-model="excludedTags"
          :options="tags"
          :multiple="true"
          :searchable="true"
          :limit="3">
        </multiselect>
      </div>
      <div class="submit">
        <span @click="go"> Start </span>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import router from '../router'

export default {
  name: 'welcome',
  components: { Multiselect },
  data () {
    return {
      selectedTags: null,
      excludedTags: null,
      tags: []
    }
  },
  methods: {
    go () {
      router.push({name: 'quiz', params: {selectedTags: this.selectedTags, excludedTags: this.excludedTags}})
    }
  },
  created () {
    let tagURL = 'https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow'
    fetch(tagURL).then(resp => resp.json()).then(data => {
      this.tags = data.items.map(tag => tag.name)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.welcome {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}
.description {
  font-size: 30px;
  margin-top: 60px;
}
.description span {
  display: block;
}
.options {
  margin-top: 50px;
}
.desc-text {
  display: block;
  margin-bottom: 20px;
}
.selected-tags {
  margin-bottom: 60px;
}
.submit {
  margin-top: 30px;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}
</style>

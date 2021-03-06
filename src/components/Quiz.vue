<template>
  <div>
    <v-touch v-on:swipeleft="next" v-on:swiperight="previous">
      <div class="back">
        <router-link to="/">
          ✕
        </router-link>
      </div>
      <div v-if="question" class="question">
        <div class="title">
          <a :href="question.link" target="_blank" rel="noopener">
            {{question.title}}
          </a>
        </div>
        <div class="meta">
          <span class="asker">
            <span>Asked by </span>
            <a :href="question.owner.link" target="_blank" rel="noopener">
              {{question.owner.display_name}}
            </a>
          </span>
          <span class="order">
            {{currentIndex+1}}/{{this.questions.length}}
          </span>
          <span class="tags">
            <span v-for="tag in question.tags">
              #{{tag}}
            </span>
          </span>
        </div>
      </div>
      <div v-else class="question">
        Nothing Found 😔.
      </div>
    </v-touch>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'quiz',
  data () {
    return {
      questions: [{title: 'Use arrow keys or swipe (mobile) to navigate!', 'link': '', owner: {}}],
      currentIndex: 0
    }
  },
  computed: {
    question () {
      if (!this.questions.length) return false
      return this.questions[this.currentIndex]
    }
  },
  methods: {
    previous () {
      this.currentIndex = this.currentIndex ? this.currentIndex - 1 : this.questions.length - 1
    },
    next () {
      this.currentIndex = this.currentIndex + 1
      if (this.currentIndex === this.questions.length) {
        this.currentIndex = 0
      }
    },
    navigate (e) {
      if (e.keyCode === 39) {
        this.next()
      } else if (e.keyCode === 37) {
        this.previous()
      } else if (e.keyCode === 27) {
        router.go(-1)
      }
    }
  },
  created () {
    window.addEventListener('keyup', this.navigate)
  },
  mounted () {
    let selectedTags = this.$route.params.selectedTags || ['javascript']
    let selected = selectedTags.join(';').replace('#', '%23')
    let excludedTags = new Set(this.$route.params.excludedTags) || ['jquery']
    let url = `https://api.stackexchange.com/2.2/questions?&order=desc&sort=votes&tagged=${selected}&pagesize=100&site=stackoverflow`
    fetch(url).then(resp => resp.json()).then(data => {
      let filteredQuestions = data.items.filter(question => {
        for (let tag of question.tags) {
          if (excludedTags.has(tag)) {
            return false
          }
        }
        return true
      })
      for (let question of filteredQuestions) {
        question.title = question.title.replace(/&quot;/g, '"').replace(/&#39;/g, '\'').replace(/&#39;/g, '\'').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
      }
      this.questions = filteredQuestions
    })
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.navigate)
  }
}
</script>

<style scoped>
.back {
  position: absolute;
  top: 20px;
  right: 20px;
}
.question {
  font-size: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.meta {
  font-size: 11px;
  color: #666;
}
.meta .tags {
  display: block;
}
.meta .order {
  float: right;
}
@media only screen and (min-device-width : 768px) {
  .question {
    font-size: 55px;
  }
  .meta {
    font-size: 14px;
  }
}
</style>

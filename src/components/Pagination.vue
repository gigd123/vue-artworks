<template>
  <div class='paginationBox d-flex justify-content-center'>
    <div class='d-flex align-items-center justify-content-between'>
      <div class="cursor-pointer pageBtn p-2" @click="changePage('prev')">prev</div>
      <div
        class='d-flex align-items-center justify-content-between'
        v-if="pageLength > 7"
      >
        <div
          class="cursor-pointer pageBtn"
          :class="currPage === 1 ? 'text-dark' : ''"
          @click="goToPageNum(1)"
        >
          1
        </div>
        <div
          v-if="pageLength > 6 && currPage > 4"
          class="d-flex align-items-center"
        >
          ...
        </div>
        <div
          class="d-flex align-items-center cursor-pointer pageBtn"
          v-for="index of 5"
          :key="index"
        >
          <div
            class="p-2"
            v-if="currPage === 5 && (currPage - 2 + index) !== 8  && pageLength === 8"
            :class="{'text-dark' : currPage === (currPage - 2 + index)}"
            @click="goToPageNum(index - 1)"
          >
            {{currPage - 2 + index}}
          </div>
          <div
            class="p-2"
            v-if="currPage < 5 && index !== 1"
            :class="{'text-dark' : currPage === index}"
            @click="goToPageNum(index)"
          >
            {{(index)}}
          </div>
          <div
            class="p-2"
            v-if="currPage >= 5 &&
                    index > 1 &&
                    index < 5 &&
                    pageLength - currPage >= 4"
            :class="{'text-dark' : currPage === (index - 3 + currPage)}"
            @click="goToPageNum(index - 3 + currPage)"
          >
            {{index - 3 + currPage}}
          </div>
          <div
            class="p-2"
            v-if="(pageLength + index - 5) < pageLength &&
                  pageLength > (pageLength + index - 5) <= 4 &&
                  pageLength - currPage < 4 &&
                  currPage >= 6"
            :class="{'text-dark' : currPage === (index - 5 + pageLength)}"
            @click="goToPageNum(index - 5 + pageLength)"
          >
            {{index - 5 + pageLength}}
          </div>
        </div>
        <div
          v-if="pageLength > 6 &&
                pageLength - currPage >= 4"
          class="d-flex align-items-center p-2"
        >
          ...
        </div>
        <div
          v-if="pageLength > 6"
          class="cursor-pointer p-2 pageBtn"
          :class="currPage === pageLength ? 'text-dark' : ''"
          @click="goToPageNum(pageLength)"
        >
          {{pageLength}}
        </div>
      </div>
      <div
        class='d-flex align-items-center justify-content-between'
        v-if="pageLength <= 7"
      >
        <div
          class="d-flex align-items-center cursor-pointer pageBtn"
          v-for="index of pageLength"
          :key="index"
        >
          <div
            class="p-2 num1-7"
            :class="{'text-dark' : currPage === index}"
            @click="goToPageNum(index)"
          >
            {{(index)}}
          </div>
        </div>
      </div>
      <div class="cursor-pointer pageBtn p-2" @click="changePage('next')">next</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Pagination',
  props: {
    currPage: Number,
    pageLength: Number
  },

  data () {
    return {
      newPage: this.currPage
    }
  },

  components: {
    // DirectionBtn
  },

  methods: {
    changePage (str) {
      console.log('changePage', str)
      if (str === 'prev') {
        this.newPage = this.currPage
        if (this.newPage > 1) {
          this.newPage = this.newPage -= 1
          this.$emit('goToPageNum', this.newPage)
        }
      } else {
        this.newPage = this.currPage
        if (this.newPage < this.pageLength) {
          this.newPage = this.newPage += 1
          this.$emit('goToPageNum', this.newPage)
        }
      }
    },

    goToPageNum (num) {
      this.newPage = num
      this.$emit('goToPageNum', this.newPage)
    }
  },

  created () {
    if (this.pageLength >= 1) {
      // 起始頁預設為 1
      this.newPage = 1
    }
  }
}
</script>

<style lang="scss">
.paginationBox {
  color: rgb(110, 110, 110);
  .pageBtn:hover {
    background-color: rgb(202, 202, 202);
    border-radius: 5px;
  }
  .cursor-pointer {
    cursor: pointer;
  }
}
</style>

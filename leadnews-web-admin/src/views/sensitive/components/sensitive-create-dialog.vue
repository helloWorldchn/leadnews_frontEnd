<template>
  <el-dialog title="新增敏感词" :visible.sync="syncDialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="442px" @close="close">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :inline="true"
      :label-width="formLabelWidth"
      label-position="left"
      size="medium"
      hide-required-asterisk
    >
      <el-form-item label="敏感词：" prop="sensitives">
        <el-input v-model="form.sensitives" autocomplete="off" placeholder="请输入敏感词" maxlength="10" show-word-limit class="dialog-input"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="warning" class="el-button--no-icon" @click="syncDialogVisible = false">取消</el-button>
      <el-button type="success" class="el-button--no-icon" @click="ensureDialog">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { saveData } from '@/api/sensitive'

export default {
  name: 'SensitiveCreateDialog',
  props: ['dialogVisible'],
  data () {
    return {
      formLabelWidth: '80px',
      form: {
        sensitives: ''
      },
      rules: {
        sensitives: [{ required: true, message: '请输入', trigger: 'change' }]
      }
    }
  },
  computed: {
    syncDialogVisible: {
      get () {
        return this.dialogVisible
      },
      set (val) {
        this.$emit('update:dialogVisible', val)
      }
    }
  },
  methods: {
    ensureDialog: async function () {
      try {
        await this.$refs.form.validate()
        const res = await saveData(this.form)

        if (res.code === 200) {
          this.syncDialogVisible = false
          this.$emit('refreshList')
          this.$message({ type: 'success', message: '操作成功！' })
        } else {
          this.$message({ type: 'error', message: res.errorMessage })
        }
      } catch (err) {
        console.log('err: ' + err)
      }
    },
    close () {
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/element-variables.scss';
// TODO: 这里再想想
/deep/ .el-dialog__body {
  padding: 30px;
}

.el-form-item {
  margin-bottom: 20px;
}

/deep/ .el-form-item__label {
  color: $--color-text-primary;
}

/deep/ .el-form-item__content {
  color: $--color-text-primary;

  .el-input .el-input__count .el-input__count-inner {
    background: $--background-color-base;
  }
}
</style>

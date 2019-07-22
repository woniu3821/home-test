<template>
    <div class="app-outbound">
        <NavBar :model="[$route]" />
        <div class="outbound_search mt-10">
            <Input
                search
                placeholder="请输入镜像名称"
                style="width:458px;"
                enter-button
                v-model="searchContent"
                @on-search="queryListFirst"
            />
        </div>
        <div class="add mt-25">
            <label>验证结果：</label>
            <ul class="tab_result">
                <li
                    v-for="({label,key},index) in result"
                    :key="index"
                    @click="changeResult(key)"
                    :class="verifyStatus===key?'active':''"
                >{{label}}</li>
            </ul>
        </div>
        <div class="table mt-10 mb-15">
            <Table
                :loading="listLoading"
                stripe
                border
                :columns="imageColumns"
                :data="imageList"
            ></Table>
            <Row>
                <Page
                    class="mt-15"
                    :total="totalSize"
                    :current="queryListParams.pageNumber"
                    show-elevator
                    @on-change="pageNumChange"
                    @on-page-size-change="pageSizeChange"
                />
            </Row>
        </div>
        <BaseModal
            v-model="showSyncModal"
            title="同步"
            @on-cancel="cancelSync"
            @on-ok="saveSync"
            width="1000"
        >
            <div class="plat_Sync">
                <div class="sync_continner">
                    <Button
                        type="primary"
                        class="mr-10"
                        @click="queryRegionList"
                        :loading="regionLoading"
                    >刷新</Button>
                    <Button
                        :disabled="!regionImageList.length"
                        type="primary"
                        :loading="hronizeLoading"
                        @click='regionSynchronize'
                    >区域下发</Button>
                </div>
                <Table
                    :loading="regionLoading"
                    stripe
                    border
                    :columns="regionColumns"
                    :data="regionImageList"
                ></Table>
                <Row>
                    <Page
                        class="mt-15"
                        :total="regionTotalSize"
                        :current="queryRegionListParams.pageNumber"
                        show-elevator
                        @on-change="regionPageNumChange"
                        @on-page-size-change="regionPageSizeChange"
                    />
                </Row>
            </div>
        </BaseModal>
    </div>
</template>
<script>
import { list, regionList, regionSynchronize } from "@api/service";
export default {
    meta: { name: "镜像管理" },
    // mixins:[emitter],
    components: {
    },
    name: "ImageList",
    props: {},
    data () {
        return {
            pushLoading: false,
            searchLoading: false,
            wid: '',
            imageList: [],
            verifyStatus: '',
            searchContent: '',
            listLoading: false,
            regionLoading: false,
            hronizeLoading: false,
            totalSize: 0,
            regionTotalSize: 0,
            regionImageList: [],
            showSyncModal: false,
            result: [
                {
                    label: '全部',
                    key: '',
                },
                {
                    label: '通过',
                    key: '1',
                },
                {
                    label: '未通过',
                    key: '0',
                },
            ]
        };
    },

    computed: {

        queryListParams () {
            return {
                searchContent: this.searchContent,
                verifyStatus: this.verifyStatus,
                // pushStatus: "",
                pageNumber: 1,
                pageSize: 10
            };
        },
        queryRegionListParams () {
            return {
                imageWid: this.wid,
                pageNumber: 1,
                pageSize: 10
            }
        },
        imageColumns () {
            return [
                {
                    title: "镜像标识",
                    key: "wid"
                },
                {
                    title: "镜像名称",
                    key: "imageName"
                },
                {
                    title: "镜像TAG",
                    key: 'imageTag'
                },
                {
                    title: "创建时间",
                    key: "createTime"
                },
                {
                    title: "CL标识",
                    key: "CILabel",
                },
                {
                    title: "验证结果",
                    key: "verifyResult",
                    width: '100',
                    render: (h, params) => {
                        const verifyResult = params.row.verifyResult === '1';
                        return (
                            <div>
                                <Button size='small' long={true} type={verifyResult ? 'success' : 'error'} shape="circle">{verifyResult ? '通过' : '未通过'}</Button>
                            </div>
                        );
                    }
                },
                {
                    title: "验证失败原因",
                    key: "errorDetails",
                },
                {
                    title: "操作",
                    align: "center",
                    render: (h, params) => {
                        return (
                            <div>
                                <span class="split" onClick={() => this.showSync(params.row)}>同步</span>
                            </div>
                        );
                    }
                }
            ];
        },
        regionColumns () {
            return [
                {
                    title: "区域中心",
                    key: "regionName"
                },
                {
                    title: "验证状态",
                    key: "verifyStatusName"
                },
                {
                    title: "推送状态",
                    key: "pushStatusName"
                },
                {
                    title: "错误详情",
                    key: "errorDetails"
                },
                {
                    title: "创建时间",
                    key: "createTime"
                },
            ]
        },
    },

    methods: {
        submit () { },
        changeResult (key) {
            this.verifyStatus = key;
            this.queryListFirst();

        },
        async queryList () {
            this.listLoading = true;
            const [err, data] = await list(this.queryListParams);
            this.listLoading = false;
            if (err) {
                const msg = err || "获取列表错误";
                this.errors(msg);
                return;
            }
            this.totalSize = data.totalSize;
            this.imageList = data.rows;
        },
        async queryRegionList () {
            this.regionLoading = true;
            const [err, data] = await regionList(this.queryRegionListParams);
            this.regionLoading = false;
            if (err) {
                const msg = err || "获取列表错误";
                this.errors(msg);
                return;
            }
            this.regionTotalSize = data.totalSize;
            this.regionImageList = data.rows;
        },
        async regionSynchronize () {
            this.hronizeLoading = true;
            const [err] = await regionSynchronize({ imageWid: this.wid });
            this.hronizeLoading = false;
            if (err) {
                const msg = err || "下发错误";
                this.errors(msg);
                return;
            }
            this.success('下发成功');
            // this.regionTotalSize = data.totalSize;
            // this.regionImageList = data.rows;
        },
        queryListFirst () {
            this.queryListParams.pageNumber = 1;
            this.queryList();
        },
        pageNumChange (num) {
            this.queryListParams.pageNumber = num;
            this.queryList();
        },
        pageSizeChange (num) {
            this.queryListParams.pageSize = num;
            this.queryList();
        },
        regionPageNumChange (num) {
            this.queryRegionListParams.pageNumber = num;
            this.queryRegionList();
        },
        regionPageSizeChange (num) {
            this.queryRegionListParams.pageSize = num;
            this.queryRegionList();
        },
        showSync ({ wid }) {
            this.showSyncModal = true;
            this.wid = wid;
            this.queryRegionList();

        },
        saveSync () {
            this.showSyncModal = false;

        },
        cancelSync () {
            this.showSyncModal = false;
        }
    },
    mounted () {
        this.queryList();
    }
};
</script>
<style lang="stylus" scoped>
.sync_continner {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
}
.has__push-wrapper {
}
.add {
    display: flex;
    align-items: center;
    .tab_result {
        display: flex;
        align-items: center;
        li {
            padding: 2px 5px;
            border-radius: 3px;
            transition: 0.3s;
            background: transparentify;
            color: $primary-color;
            margin-right: 10px;
            cursor: pointer;
        }
        li.active {
            background: $primary-color;
            color: #fff;
        }
    }
}
.plat_Sync {
    // fon-size: 14px;
    // display: flex;
    // align-items: center;
    // height: 50px;
}
.app-outbound {
    >>>.split {
        cursor: pointer;
        color: $primary-color;
    }
}
</style>

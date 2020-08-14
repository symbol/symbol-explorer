<script>
import TableListView from '@/components/tables/TableListView.vue';
import TableInfoView from '@/components/tables/TableInfoView.vue';
import DropDown from '@/components/controls/Dropdown.vue';
import Pagination from '@/components/controls/Pagination.vue';
import Card from '@/components/containers/Card.vue';
import Modal from '@/components/containers/Modal.vue';
export default {
	components: {
		TableListView,
		TableInfoView,
		Card,
		DropDown,
		Pagination,
		Modal
	},

	async mounted() {
		await this.$store.dispatch('initialize', this.$route);
		if (this.storeNamespaces?.length) {
			for (const namespace of this.storeNamespaces)
				await this.$store.dispatch(namespace + '/initialize');
		}
	}
};
</script>

<style lang="scss">
.page {
    .page-content-card-f {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .card-f {
        margin: 10px;
    }

    .card-adaptive {
        flex: 1 1 auto;
        max-width: 100%;
    }

    .card-full-width {
        width: 100%;
    }

    .max-height-medium {
        max-height: 100px;
    }

    @media screen and (max-width: 40em) {
        .page-content-card-f {
            padding-left: 0;
            padding-right: 0;
        }

        .card-f {
            padding: 5px;
            padding-top: 10px;
            margin-left: 0;
            margin-right: 0;
            width: 100%;
        }
    }

    @media screen and (min-width: 80em) {
        .page-content-card-f {
            padding-left: 80px;
            padding-right: 80px;
        }

        .card-f {
            margin-right: 10px;
        }
    }
}
</style>

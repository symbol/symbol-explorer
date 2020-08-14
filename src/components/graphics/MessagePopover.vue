<template>
	<b-popover :target="target" placement="bottom" triggers="hover">
		<template v-slot:title>{{ title }}</template>
		<div class="message-popover">
			<pre v-if="true" v-html="formattedMessage"></pre>
			<pre v-else>
                {{ formattedMessage }}
            </pre>
		</div>
	</b-popover>
</template>

<script>
import GraphicComponent from './GraphicComponent.vue';

export default {
	extends: GraphicComponent,

	props: {
		message: {
			type: String,
			default: ''
		},

		title: {
			type: String,
			default: 'Message'
		},

		target: {
			type: String,
			required: true
		}
	},

	data() {
		return {
			isJSON: false
		};
	},

	computed: {
		formattedMessage() {
			try {
				const obj = JSON.parse(this.message);

				return this.JSONToHTML(obj);
			}
			catch (e) {
				return this.message;
			}
		}
	},

	methods: {
		JSONToHTML(thing) {
			const htmlEntities = string => {
				return string
					.replace(/&/g, '&amp;')
					.replace(/\\"/g, '&bsol;&quot;')
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;');
			};
			const replacer = (match, p1, p2, p3, p4) => {
				const part = { indent: p1, key: p2, value: p3, end: p4 };
				const key = '<span class=json-key>';
				const val = '<span class=json-value>';
				const bool = '<span class=json-boolean>';
				const str = '<span class=json-string>';
				const isBool = ['true', 'false'].includes(part.value);
				const valSpan = /^"/.test(part.value)
					? str
					: isBool
						? bool
						: val;
				const findName = /"([\w]+)": |(.*): /;
				const indentHtml = part.indent || '';
				const keyHtml = part.key
					? key + part.key.replace(findName, '$1$2') + '</span>: '
					: '';
				const valueHtml = part.value
					? valSpan + part.value + '</span>'
					: '';
				const endHtml = part.end || '';

				return indentHtml + keyHtml + valueHtml + endHtml;
			};
			const jsonLine = /^( *)("[^"]+": )?("[^"]*"|[\w.+-]*)?([{}[\],]*)?$/gm;

			this.isJSON = true;
			return htmlEntities(JSON.stringify(thing, null, 3)).replace(
				jsonLine,
				replacer
			);
		}
	}
};
</script>

<style lang="scss">
.message-popover {
    max-height: 600px;
    overflow: auto;
}

.json-key {
    color: var(--secondary);
}

.json-value {
    color: var(--primary);
}

.json-boolean {
    color: var(--blue);
}

.json-string {
    color: var(--orange);
}
</style>

<script>
export default {
    name: "Render",
    functional: true,
    props: {
        render: Function
    },
    render: (h, ctx) => ctx.props.render(h)
};
</script>

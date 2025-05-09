# frozen_string_literal: true

# https://github.com/rubocop/rubocop-rails/blob/2a217d0c70e4c1d24efa6b638e93fa693a938276/lib/rubocop/rails/schema_loader.rb

module Rubocop
  module Rails
    # It loads db/schema.rb and return Schema object.
    # Cops refers database schema information with this module.
    module SchemaLoader
      extend self

      # It parses `db/schema.rb` and return it.
      # It returns `nil` if it can't find `db/schema.rb`.
      # So a cop that uses the loader should handle `nil` properly.
      #
      # @return [Schema, nil]
      def load(target_ruby_version)
        return @schema if defined?(@schema)

        @schema = load!(target_ruby_version)
      end

      def reset!
        return unless instance_variable_defined?(:@schema)

        remove_instance_variable(:@schema)
      end

      private

      def load!(target_ruby_version)
        path = db_schema_path
        return unless path

        ast = parse(path, target_ruby_version)
        Schema.new(ast)
      end

      def db_schema_path
        path = Pathname.pwd
        until path.root?
          schema_path = path.join('db/schema.rb')
          return schema_path if schema_path.exist?

          path = path.join('../').cleanpath
        end

        nil
      end

      def parse(path, target_ruby_version)
        klass_name = :"Ruby#{target_ruby_version.to_s.sub('.', '')}"
        klass = ::Parser.const_get(klass_name)
        parser = klass.new(RuboCop::AST::Builder.new)

        buffer = Parser::Source::Buffer.new(path, 1)
        buffer.source = path.read

        parser.parse(buffer)
      end
    end
  end
end

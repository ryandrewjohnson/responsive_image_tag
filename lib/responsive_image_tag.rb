begin
  require 'padrino-gen'
  Padrino::Generators.load_paths << Dir[File.dirname(__FILE__) + '/generators/responsive_image_tag/padrino_copy_rit_js.rb']
rescue LoadError
  # Fail silently
  puts "Error"
end

module ResponsiveImageTag
  # Emits the special (and somewhat ugly) markup for our responsive image
  # tag.
  #
  # NB: the @image_path@ method is a private method of the Rails
  # asset_tag_helper.
  #
  def responsive_image_tag(small, medium, large, options = {})
    output = tag "span", {:class => "img-placeholder"}
    output += tag "/span", nil, true
    output += tag "noscript", noscript_attributes(small, medium, large, options), true
    output += image_tag(large, options)
    output += tag "/noscript", nil, true
    output
  end

  private

  def noscript_attributes(small, medium, large, options)
    attrs = {
      "data-lrgsrc" => image_path(large),
      "data-medsrc" => image_path(medium),
      "data-smallsrc" => image_path(small),
      :class => "responsivize"
    }
    unless options.nil? || options == {}
      attrs.merge!("data-alttext" => options[:alt]) unless options[:alt].nil?
      attrs.merge!("data-cssclass" => options[:class]) unless options[:class].nil?
    end
    attrs
  end
end

ActionView::Base.send(:include, ResponsiveImageTag) if defined?(ActionView::Base)